"use client";

import { StaticLinkButton } from "@/components/StaticLinkButton";
import { siteContent } from "@/content/site-content";
import { track } from "@/lib/analytics";
import { Button } from "@once-ui-system/core";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";
type FieldName = keyof typeof copy.fieldErrors;

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "";
const configured = endpoint.length > 0;
const { form: copy } = siteContent.contact;
const { actions } = siteContent;
const fieldOrder: FieldName[] = ["name", "email", "organization", "role", "message"];
const { recipients } = siteContent.contact;

/** Without a server endpoint the visitor's own email app carries the note to the team. */
function mailtoFor(payload: Record<string, string>) {
  const lines = [
    `Name: ${payload.name}`,
    `Work email: ${payload.email}`,
    `Organization: ${payload.organization}`,
    `Organization type: ${payload.role}`,
    "",
    payload.message,
  ];
  const params = new URLSearchParams({
    cc: recipients.cc.join(","),
    subject: `${recipients.subject} from ${payload.organization}`,
    body: lines.join("\n"),
  });
  // URLSearchParams encodes spaces as "+", which mail clients render literally.
  return `mailto:${recipients.to}?${params.toString().replace(/\+/g, "%20")}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState<Partial<Record<FieldName, boolean>>>({});
  const [sentTo, setSentTo] = useState("");
  const [mailto, setMailto] = useState("");
  const successRef = useRef<HTMLOutputElement>(null);
  const startedRef = useRef(false);
  const sendingRef = useRef(false);

  useEffect(() => {
    if (!configured) track("contact_configuration_error");
  }, []);

  // Focus after React has committed the <output>; a requestAnimationFrame can run before the
  // commit in WebKit and land on nothing.
  useEffect(() => {
    if (status === "sent" || status === "mailto") successRef.current?.focus();
  }, [status]);

  function noteStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("contact_start");
  }

  /** Persistent per-field messages; the browser bubble alone disappears on the next keypress. */
  function reportInvalidFields(form: HTMLFormElement) {
    const next: Partial<Record<FieldName, boolean>> = {};
    for (const name of fieldOrder) {
      const field = form.elements.namedItem(name) as HTMLInputElement | null;
      if (field && !field.checkValidity()) next[name] = true;
    }
    setInvalid(next);
    track("contact_validation_error", { fields: Object.keys(next).join(",") });
    const first = fieldOrder.find((name) => next[name]);
    if (first) (form.elements.namedItem(first) as HTMLInputElement | null)?.focus();
  }

  function clearInvalid(name: FieldName) {
    setInvalid((current) => (current[name] ? { ...current, [name]: false } : current));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (sendingRef.current) return;

    if (!form.checkValidity()) {
      reportInvalidFields(form);
      return;
    }

    setInvalid({});
    if (!configured) {
      const payload = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
      const href = mailtoFor(payload);
      setMailto(href);
      setStatus("mailto");
      track("contact_mailto");
      window.location.assign(href);
      return;
    }

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
      setSentTo(String(payload.email ?? ""));
      setStatus("sent");
      track("contact_complete");
    } catch {
      setError(copy.submitError);
      setStatus("error");
      track("contact_submit_error");
    } finally {
      sendingRef.current = false;
    }
  }

  function fieldProps(name: FieldName) {
    return {
      id: name,
      name,
      required: true,
      "aria-invalid": invalid[name] ? true : undefined,
      "aria-describedby": invalid[name] ? `${name}-error` : undefined,
      onInput: () => clearInvalid(name),
    };
  }

  if (status === "mailto") {
    return (
      <output className="form-success is-visible" aria-live="polite" tabIndex={-1} ref={successRef}>
        <h2>{copy.mailtoTitle}</h2>
        <p>{copy.mailtoBody}</p>
        <a className="button button-primary" href={mailto} data-cta={actions.sendByEmail}>
          {actions.sendByEmail} <HiArrowRight aria-hidden="true" />
        </a>
      </output>
    );
  }

  if (status === "sent") {
    return (
      <output className="form-success is-visible" aria-live="polite" tabIndex={-1} ref={successRef}>
        <h2>{copy.successTitle}</h2>
        <p>{copy.successBody}</p>
        {sentTo && (
          <p className="form-success-reply">
            {copy.successReply} <strong>{sentTo}</strong> {copy.successReplyTail}
          </p>
        )}
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
      noValidate
      onSubmit={submit}
      onFocus={noteStart}
      aria-busy={status === "sending"}
      data-configured={configured}
    >
      {!configured && <output className="form-status">{copy.configuration}</output>}
      <p className="form-required">{copy.required}</p>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input {...fieldProps("name")} autoComplete="name" />
          {invalid.name && (
            <p className="field-error" id="name-error">
              {copy.fieldErrors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">Work email</label>
          <input {...fieldProps("email")} type="email" autoComplete="email" />
          {invalid.email && (
            <p className="field-error" id="email-error">
              {copy.fieldErrors.email}
            </p>
          )}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="organization">Organization</label>
          <input {...fieldProps("organization")} autoComplete="organization" />
          {invalid.organization && (
            <p className="field-error" id="organization-error">
              {copy.fieldErrors.organization}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="role">Organization type</label>
          <select {...fieldProps("role")} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option>Foundation</option>
            <option>Nonprofit</option>
            <option>Evaluation team</option>
            <option>Other mission-led organization</option>
          </select>
          {invalid.role && (
            <p className="field-error" id="role-error">
              {copy.fieldErrors.role}
            </p>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">{copy.messageLabel}</label>
        <textarea {...fieldProps("message")} placeholder={copy.messagePlaceholder} />
        {invalid.message && (
          <p className="field-error" id="message-error">
            {copy.fieldErrors.message}
          </p>
        )}
      </div>
      {status === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <Button className="button button-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? actions.sending : configured ? actions.send : actions.sendByEmail}{" "}
        <HiArrowRight aria-hidden="true" />
      </Button>
      <p className="form-help">{copy.help}</p>
      <noscript>
        <p className="form-help">{copy.noscript}</p>
      </noscript>
    </form>
  );
}
