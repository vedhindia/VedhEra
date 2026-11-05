"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Send,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Paperclip,
  Mail,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { applicationForm, openings, APPLICATION_EMAIL } from "@/data/career";

const EASE = [0.22, 1, 0.36, 1];

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ACCEPTED_EXTENSIONS = /\.(pdf|doc|docx)$/i;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD_ORDER = ["name", "email", "phone", "position", "resume", "message"];
const EMPTY_VALUES = { name: "", email: "", phone: "", message: "" };

/** Client-side validation. Returns a map of field name to message. */
function validate(values, resume, position) {
  const errors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Please enter your full name.";
  else if (name.length < 2) errors.name = "Please enter a valid name.";

  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!phone) errors.phone = "Please enter your phone number.";
  else if (digits.length < 7 || digits.length > 15)
    errors.phone = "Please enter a valid phone number.";

  if (!position) errors.position = "Please choose the position you are applying for.";

  if (!resume) errors.resume = "Please attach your resume.";
  else if (resume.size > MAX_RESUME_BYTES) errors.resume = "Your resume must be 5 MB or smaller.";
  else if (!ACCEPTED_TYPES.includes(resume.type) && !ACCEPTED_EXTENSIONS.test(resume.name))
    errors.resume = "Please upload your resume as a PDF, DOC or DOCX file.";

  return errors;
}

function inputClass(hasError) {
  return `w-full rounded-xl border bg-[var(--color-deep-charcoal)]/70 px-4 py-3 text-sm text-white placeholder:text-[var(--color-medium-grey)] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-silver)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-graphite)] ${
    hasError
      ? "border-[#9c544c]"
      : "border-[var(--color-silver)]/20 hover:border-[var(--color-silver)]/35"
  }`;
}

function Label({ htmlFor, children, optional = false }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 text-[11px] font-medium tracking-[0.18em] text-[var(--color-silver)] uppercase"
    >
      {children}
      {optional ? (
        <span className="ml-1 normal-case tracking-normal text-[var(--color-medium-grey)]">
          (optional)
        </span>
      ) : (
        <span aria-hidden="true" className="ml-1 text-[var(--color-light-silver)]">
          *
        </span>
      )}
    </label>
  );
}

/**
 * Career application form.
 *
 * There is no server in this project, so the form validates the input and then
 * hands the application to the visitor's own email client. Nothing is faked:
 * the success state only reports that the mail draft was opened.
 *
 * `position` is controlled by the parent so an opening card can pre-select it.
 *
 * @param {object} props
 * @param {string} [props.position] Currently selected role id.
 * @param {(position: string) => void} [props.onPositionChange]
 */
export default function ApplicationForm({ position = "", onPositionChange }) {
  const reduceMotion = useReducedMotion();
  const fieldRefs = useRef({});
  const [values, setValues] = useState(EMPTY_VALUES);
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const clearError = (field) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    clearError(name);
    setStatus(null);
  };

  const handleResumeChange = (event) => {
    setResume(event.target.files?.[0] ?? null);
    clearError("resume");
    setStatus(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate(values, resume, position);
    if (FIELD_ORDER.some((field) => nextErrors[field])) {
      setErrors(nextErrors);
      setStatus({
        type: "error",
        message: "Some details need your attention. Please review the highlighted fields.",
      });
      fieldRefs.current[FIELD_ORDER.find((field) => nextErrors[field])]?.focus();
      return;
    }

    setErrors({});
    const positionLabel =
      openings.roles.find((role) => role.id === position)?.title ?? position;

    const lines = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Position Applying For: ${positionLabel}`,
      `Resume to attach: ${resume.name}`,
      "",
      "Message:",
      values.message.trim() || "(no additional message)",
    ];

    const mailto = `mailto:${APPLICATION_EMAIL}?subject=${encodeURIComponent(
      `Application — ${positionLabel} — ${values.name.trim()}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    setStatus({
      type: "success",
      message: `${applicationForm.successMessage} (${resume.name})`,
    });

    window.alert(applicationForm.successMessage);
    window.location.href = mailto;
  };

  return (
    <section
      id="apply"
      aria-labelledby="apply-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[var(--color-graphite)] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_10%_0%,rgba(192,196,201,0.12),transparent_58%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              tone="dark"
              eyebrow={applicationForm.eyebrow}
              title={applicationForm.heading}
              body={applicationForm.body}
            />

            <p className="mt-8 flex max-w-md items-start gap-3 text-sm leading-relaxed text-[var(--color-medium-grey)]">
              <Paperclip
                size={16}
                strokeWidth={1.7}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[var(--color-silver)]"
              />
              <span>{applicationForm.resumeHint}</span>
            </p>

            <p className="mt-6 flex flex-wrap items-center gap-2 text-sm text-[var(--color-silver)]">
              <Mail size={15} strokeWidth={1.7} aria-hidden="true" />
              {applicationForm.fallbackNote}
              <a
                href={`mailto:${APPLICATION_EMAIL}`}
                className="underline decoration-[var(--color-silver)]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                {APPLICATION_EMAIL}
              </a>
            </p>
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={reduceMotion ? undefined : { once: true, margin: "-60px" }}
          transition={reduceMotion ? undefined : { duration: 0.6, ease: EASE }}
          className="lg:col-span-7"
        >
          <form
            noValidate
            onSubmit={handleSubmit}
            className=" p-6 sm:p-8"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col">
                <Label htmlFor="name">Name</Label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  ref={(node) => {
                    fieldRefs.current.name = node;
                  }}
                  className={inputClass(Boolean(errors.name))}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-2 text-xs text-[#e6a7a0]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="email">Email</Label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  ref={(node) => {
                    fieldRefs.current.email = node;
                  }}
                  className={inputClass(Boolean(errors.email))}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-2 text-xs text-[#e6a7a0]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="phone">Phone</Label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  ref={(node) => {
                    fieldRefs.current.phone = node;
                  }}
                  className={inputClass(Boolean(errors.phone))}
                />
                {errors.phone && (
                  <p id="phone-error" role="alert" className="mt-2 text-xs text-[#e6a7a0]">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="position">Position Applying For</Label>
                <div className="relative">
                  <select
                    id="position"
                    name="position"
                    required
                    value={position}
                    onChange={(event) => {
                      onPositionChange?.(event.target.value);
                      clearError("position");
                      setStatus(null);
                    }}
                    aria-invalid={Boolean(errors.position)}
                    aria-describedby={errors.position ? "position-error" : undefined}
                    ref={(node) => {
                      fieldRefs.current.position = node;
                    }}
                    className={`${inputClass(Boolean(errors.position))} cursor-pointer appearance-none pr-10 ${
                      position ? "text-white" : "text-[var(--color-medium-grey)]"
                    }`}
                  >
                    <option value="">Select a position</option>
                    {openings.roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.title}
                      </option>
                    ))}
                    <option value="other">Other / General Application</option>
                  </select>
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[var(--color-silver)]"
                  />
                </div>
                {errors.position && (
                  <p id="position-error" role="alert" className="mt-2 text-xs text-[#e6a7a0]">
                    {errors.position}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:col-span-2">
                <Label htmlFor="resume">Resume Upload</Label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  required
                  onChange={handleResumeChange}
                  aria-invalid={Boolean(errors.resume)}
                  aria-describedby={errors.resume ? "resume-error" : "resume-hint"}
                  ref={(node) => {
                    fieldRefs.current.resume = node;
                  }}
                  className={`${inputClass(Boolean(errors.resume))} cursor-pointer file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-[var(--color-charcoal)] file:px-4 file:py-2 file:text-xs file:font-medium file:tracking-wide file:text-white file:transition-colors hover:file:bg-[var(--color-charcoal)]/75`}
                />
                {errors.resume ? (
                  <p id="resume-error" role="alert" className="mt-2 text-xs text-[#e6a7a0]">
                    {errors.resume}
                  </p>
                ) : (
                  <p id="resume-hint" className="mt-2 text-xs text-[var(--color-medium-grey)]">
                    PDF, DOC or DOCX — up to 5 MB.
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:col-span-2">
                <Label htmlFor="message" optional>
                  Message
                </Label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about your work and what you would like to do next."
                  ref={(node) => {
                    fieldRefs.current.message = node;
                  }}
                  className={`${inputClass(false)} resize-y`}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-[var(--color-graphite)] transition-colors duration-300 hover:bg-[var(--color-light-silver)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-silver)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-graphite)]"
              >
                {applicationForm.submitLabel}
                <Send size={15} aria-hidden="true" />
              </button>

              <p className="text-xs leading-relaxed text-[var(--color-medium-grey)]">
                Applications open in your own email app. Attach your resume there before sending.
              </p>
            </div>

            {status && (
              <p
                role={status.type === "error" ? "alert" : "status"}
                className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
                  status.type === "error"
                    ? "border-[#9c544c] bg-[#9c544c]/10 text-[#e6a7a0]"
                    : "border-[var(--color-silver)]/30 bg-[var(--color-silver)]/10 text-[var(--color-light-silver)]"
                }`}
              >
                {status.type === "error" ? (
                  <AlertCircle size={16} strokeWidth={1.8} aria-hidden="true" className="mt-0.5 shrink-0" />
                ) : (
                  <CheckCircle2 size={16} strokeWidth={1.8} aria-hidden="true" className="mt-0.5 shrink-0" />
                )}
                <span>{status.message}</span>
              </p>
            )}

          </form>
        </motion.div>
      </div>
    </section>
  );
}
