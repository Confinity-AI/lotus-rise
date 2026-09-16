"use client";

import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import { track } from "@/lib/analytics";
import { Button } from "@once-ui-system/core";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";

type Status = "idle" | "sending" | "sent" | "error";

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "";
const configured = endpoint.length > 0;
const { form: copy } = siteContent.contact;
const { actions } = siteContent;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const successRef = useRef<HTMLOutputElement>(null);
  const startedRef = useRef(false);
  const sendingRef = useRef(false);
  const invalidAtRef = useRef(0);

  useEffect(() => {
    if (!configured) track("contact_configuration_error");
  }, []);

  function noteStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("contact_start");
  }

  // Native validation cancels the submit event, so the browser's `invalid` event is the
  // only hook. Several fields can fail in one attempt; report the attempt once.
  function noteInvalid() {
    const now = Date.now();
    if (now - invalidAtRef.current < 500) return;
    invalidAtRef.current = now;
    track("contact_validation_error");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!configured || sendingRef.current) return;

    if (!form.reportValidity()) return;

    sendingRef.current = true;
    setStatus("sending");
    setError("");
    track("contact_submit");

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);
      setStatus("sent");
      track("contact_complete");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setError(copy.submitError);
      setStatus("error");
      track("contact_submit_error");
    } finally {
      sendingRef.current = false;
    }
  }

  if (status === "sent") {
    return (
      <output className="form-success is-visible" aria-live="polite" tabIndex={-1} ref={successRef}>
        <h2>{copy.successTitle}</h2>
        <p>{copy.successBody}</p>
        <StaticLinkButton
          className="button button-secondary"
          href="/"
          data-cta={actions.returnHome}
        >
          {actions.returnHome}
        </StaticLinkButton>
      </output>
    );
  }

  return (
    <form
      className="contact-form"
      method="post"
      onSubmit={submit}
      onInvalid={noteInvalid}
      onFocus={noteStart}
      aria-busy={status === "sending"}
      data-configured={configured}
    >
      {!configured && <output className="form-status">{copy.configuration}</output>}
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="organization">Organization</label>
          <input id="organization" name="organization" autoComplete="organization" required />
        </div>
        <div className="field">
          <label htmlFor="role">Organization type</label>
          <select id="role" name="role" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option>Foundation</option>
            <option>Nonprofit</option>
            <option>Evaluation team</option>
            <option>Other mission-led organization</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">{siteContent.contact.title}</label>
        <textarea id="message" name="message" placeholder="A few sentences are enough." required />
      </div>
      {status === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <Button
        className="button button-primary"
        type="submit"
        disabled={!configured || status === "sending"}
      >
        {status === "sending" ? actions.sending : actions.send} <HiArrowRight aria-hidden="true" />
      </Button>
      <p className="form-help">{copy.help}</p>
      <noscript>
        <p className="form-help">{copy.noscript}</p>
      </noscript>
    </form>
  );
}
