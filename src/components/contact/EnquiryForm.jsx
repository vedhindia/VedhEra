"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Send, Loader2, ChevronDown, AlertCircle, CheckCircle2, Mail } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { enquiryForm, enquiryServices, ENQUIRY_EMAIL } from "@/data/contact";

const EASE = [0.22, 1, 0.36, 1];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_DETAILS = 10;

const FIELD_ORDER = ["name", "email", "phone", "service", "details"];
const EMPTY_VALUES = {
  name: "",
  company: "",
  email: "",
  phone: "",
  budget: "",
  details: "",
};

/** Client-side validation. Returns a map of field name to message. */
function validate(values, service) {
  const errors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Please enter a valid name.";

  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!phone) errors.phone = "Please enter your phone number.";
  else if (digits.length < 7 || digits.length > 15)
    errors.phone = "Please enter a valid phone number.";

  if (!service) errors.service = "Please select the service you need.";

  const details = values.details.trim();
  if (!details) errors.details = "Please tell us a little about your project.";
  else if (details.length < MIN_DETAILS)
    errors.details = `Please add a few more details (at least ${MIN_DETAILS} characters).`;

  return errors;
}

function inputClass(hasError) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-[var(--color-graphite)] placeholder:text-[var(--color-medium-grey)] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-graphite)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 ${
    hasError
      ? "border-[#b4544c]"
      : "border-[var(--color-graphite)]/15 hover:border-[var(--color-graphite)]/35"
  }`;
}

function Label({ htmlFor, children, optional = false }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 text-[11px] font-medium tracking-[0.18em] text-[var(--color-charcoal)] uppercase"
    >
      {children}
      {optional ? (
        <span className="ml-1 tracking-normal text-[var(--color-medium-grey)] normal-case">
          (optional)
        </span>
      ) : (
        <span aria-hidden="true" className="ml-1 text-[var(--color-graphite)]">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs text-[#8f4b45]">
      {children}
    </p>
  );
}

/**
 * Project enquiry form.
 *
 * There is no server in this project, so the form validates the input and then
 * hands the enquiry to the visitor's own email client. Nothing is faked — the
 * success state only reports that the mail draft was opened.
 */
export default function EnquiryForm() {
  const reduceMotion = useReducedMotion();
  const fieldRefs = useRef({});
  const [values, setValues] = useState(EMPTY_VALUES);
  const [service, setService] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const isSubmitting = status?.type === "submitting";

  const clearError = (field) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    clearError(name);
    if (status && status.type !== "submitting") setStatus(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate(values, service);
    if (FIELD_ORDER.some((field) => nextErrors[field])) {
      setErrors(nextErrors);
      setStatus({ type: "error", message: enquiryForm.errorSummary });
      fieldRefs.current[FIELD_ORDER.find((field) => nextErrors[field])]?.focus();
      return;
    }

    setErrors({});
    setStatus({ type: "submitting", message: "" });

    const body = [
      `Name: ${values.name.trim()}`,
      `Company Name: ${values.company.trim() || "—"}`,
      `Email: ${values.email.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Service Required: ${service}`,
      `Budget: ${values.budget.trim() || "Not specified"}`,
      "",
      "Project Details:",
      values.details.trim(),
    ];

    const mailto = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(
      `New Enquiry — ${service} — ${values.name.trim()}`,
    )}&body=${encodeURIComponent(body.join("\n"))}`;

    // Let the submitting state paint before the mail client takes over.
    window.requestAnimationFrame(() => {
      setStatus({ type: "success", message: enquiryForm.successMessage });
      window.alert(enquiryForm.successMessage);
      window.location.href = mailto;
    });
  };

  return (
    <div className="lg:col-span-7">
      <SectionHeading
        tone="light"
        eyebrow={enquiryForm.eyebrow}
        title={enquiryForm.heading}
        body={enquiryForm.body}
      />

      <motion.form
        initial={reduceMotion ? false : { opacity: 0, y: 26 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={reduceMotion ? undefined : { once: true, margin: "-60px" }}
        transition={reduceMotion ? undefined : { duration: 0.6, ease: EASE }}
        noValidate
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
        className="mt-10 p-6 sm:p-8"
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
              disabled={isSubmitting}
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
            <FieldError id="name-error">{errors.name}</FieldError>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="company" optional>
              Company Name
            </Label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              disabled={isSubmitting}
              value={values.company}
              onChange={handleChange}
              placeholder="Your company"
              className={inputClass(false)}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
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
            <FieldError id="email-error">{errors.email}</FieldError>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="phone">Phone</Label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              disabled={isSubmitting}
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
            <FieldError id="phone-error">{errors.phone}</FieldError>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="service">Service Required</Label>
            <div className="relative">
              <select
                id="service"
                name="service"
                required
                disabled={isSubmitting}
                value={service}
                onChange={(event) => {
                  setService(event.target.value);
                  clearError("service");
                  if (status && status.type !== "submitting") setStatus(null);
                }}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? "service-error" : undefined}
                ref={(node) => {
                  fieldRefs.current.service = node;
                }}
                className={`${inputClass(Boolean(errors.service))} cursor-pointer appearance-none pr-10 ${
                  service ? "text-[var(--color-graphite)]" : "text-[var(--color-medium-grey)]"
                }`}
              >
                <option value="">Select a service</option>
                {enquiryServices.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[var(--color-charcoal)]"
              />
            </div>
            <FieldError id="service-error">{errors.service}</FieldError>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="budget" optional>
              Budget
            </Label>
            <input
              id="budget"
              name="budget"
              type="text"
              disabled={isSubmitting}
              value={values.budget}
              onChange={handleChange}
              placeholder="e.g. a rough range"
              aria-describedby="budget-hint"
              className={inputClass(false)}
            />
            <p id="budget-hint" className="mt-2 text-xs text-[var(--color-medium-grey)]">
              {enquiryForm.budgetHint}
            </p>
          </div>

          <div className="flex flex-col sm:col-span-2">
            <Label htmlFor="details">Project Details</Label>
            <textarea
              id="details"
              name="details"
              rows={5}
              required
              disabled={isSubmitting}
              value={values.details}
              onChange={handleChange}
              placeholder="What are you building, and what would a successful outcome look like?"
              aria-invalid={Boolean(errors.details)}
              aria-describedby={errors.details ? "details-error" : undefined}
              ref={(node) => {
                fieldRefs.current.details = node;
              }}
              className={`${inputClass(Boolean(errors.details))} resize-y`}
            />
            <FieldError id="details-error">{errors.details}</FieldError>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--color-graphite)] px-7 py-3 text-sm font-medium text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-charcoal)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-graphite)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSubmitting ? (
              <>
                {enquiryForm.submittingLabel}
                <Loader2 size={15} aria-hidden="true" className="animate-spin" />
              </>
            ) : (
              <>
                {enquiryForm.submitLabel}
                <Send size={15} aria-hidden="true" />
              </>
            )}
          </button>

          <p className="text-xs leading-relaxed text-[var(--color-medium-grey)]">
            {enquiryForm.footerNote}
          </p>
        </div>

        {status && status.type !== "submitting" && (
          <p
            role={status.type === "error" ? "alert" : "status"}
            className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
              status.type === "error"
                ? "border-[#b4544c]/40 bg-[#b4544c]/8 text-[#8f4b45]"
                : "border-[var(--color-graphite)]/15 bg-[var(--color-soft-white)] text-[var(--color-charcoal)]"
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

        <p className="mt-6 flex flex-wrap items-center gap-2 text-xs text-[var(--color-medium-grey)]">
          <Mail size={13} strokeWidth={1.8} aria-hidden="true" />
          {enquiryForm.fallbackNote}
          <a
            href={`mailto:${ENQUIRY_EMAIL}`}
            className="underline decoration-[var(--color-medium-grey)]/50 underline-offset-4 transition-colors hover:text-[var(--color-graphite)]"
          >
            {ENQUIRY_EMAIL}
          </a>
        </p>
      </motion.form>
    </div>
  );
}
