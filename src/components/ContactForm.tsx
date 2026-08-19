"use client";

import { StaticLinkButton } from "@/components/StaticLinkButton";
import { Button } from "@once-ui-system/core";
import { type FormEvent, useRef, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";

type Status = "idle" | "sending" | "sent" | "error";

function track(name: string, detail: Record<string, unknown> = {}) {
  window.dispatchEvent(new CustomEvent("lotus:analytics", { detail: { name, ...detail } }));
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const successRef = useRef<HTMLOutputElement>(null);
  const startedRef = useRef(false);

  function noteStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("contact_start");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) {
      track("contact_validation_error");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    if (!endpoint) {
      setError("The contact form is not connected yet. Please try again later.");
      setStatus("error");
      track("contact_configuration_error");
      return;
    }

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
      setError("We could not send your request. Please try again in a moment.");
      setStatus("error");
      track("contact_submit_error");
    }
  }

  if (status === "sent") {
    return (
      <output className="form-success is-visible" aria-live="polite" tabIndex={-1} ref={successRef}>
        <h2>Thank you.</h2>
        <p>We have your note and will be in touch.</p>
        <StaticLinkButton className="button button-secondary" href="/">
          Return to the homepage
        </StaticLinkButton>
      </output>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} onFocus={noteStart}>
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
          <label htmlFor="role">You work in</label>
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
        <label htmlFor="message">What would you like to improve?</label>
        <textarea id="message" name="message" placeholder="A few sentences are enough." required />
      </div>
      {status === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <Button className="button button-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : "Send request"} <HiArrowRight aria-hidden="true" />
      </Button>
      <p className="form-help">We will only use these details to respond to your request.</p>
    </form>
  );
}
