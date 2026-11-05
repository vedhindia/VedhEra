"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactDetails, ENQUIRY_EMAIL } from "@/data/contact";
import { stallEnquiry, stallServiceOptions } from "@/data/stallDesign";

const EASE = [0.22, 1, 0.36, 1];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_DETAILS = 10;

/** Order used to move focus to the first field that needs attention. */
const FIELD_ORDER = ["name", "email", "phone", "exhibition", "services", "details"];

const EMPTY_VALUES = {
  name: "",
  company: "",
  email: "",
  phone: "",
  exhibition: "",
  dimensions: "",
  eventDate: "",
  details: "",
};

/** Client-side validation. Returns a map of field name to message. */
function validate(values, services) {
  const errors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Please enter a valid name.";

  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "Please enter a valid email address.";

  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!phone) errors.phone = "Please enter your phone number.";
  else if (digits.length < 7 || digits.length > 15)
    errors.phone = "Please enter a valid phone number.";

  if (!values.exhibition.trim())
    errors.exhibition = "Please tell us which exhibition, and where.";

  if (services.length === 0)
    errors.services = "Please select at least one service you need.";

  const details = values.details.trim();
  if (!details) errors.details = "Please tell us a little about the stall.";
  else if (details.length < MIN_DETAILS)
    errors.details = `Please add a few more details (at least ${MIN_DETAILS} characters).`;

  return errors;
}

function inputClass(hasError) {
  return `w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-white placeholder:text-[var(--color-silver)]/70 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-silver)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-black)] disabled:opacity-60 ${
    hasError
      ? "border-[#fca5a5]"
      : "border-white/25 hover:border-white/50"
  }`;
}

function Label({ htmlFor, children, optional = false }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 text-[11px] font-medium tracking-[0.18em] text-white uppercase"
    >
      {children}
      {optional ? (
        <span className="ml-1 tracking-normal text-[var(--color-silver)] normal-case">
          (optional)
        </span>
      ) : (
        <span aria-hidden="true" className="ml-1 text-white">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs text-[#fca5a5]">
      {children}
    </p>
  );
}

/**
 * Exhibition stall quotation enquiry.
 *
 * There is no server in this project, so the form validates the input and then
 * hands the enquiry to the visitor's own email client. Nothing is simulated —
 * the success state only reports that the mail draft was opened.
 */
export default function StallEnquiryForm() {
  const reduceMotion = useHydratedReducedMotion();
  const fieldRefs = useRef({});
  const [values, setValues] = useState(EMPTY_VALUES);
  const [services, setServices] = useState([]);
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

  const toggleService = (option) => {
    setServices((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
    clearError("services");
    if (status && status.type !== "submitting") setStatus(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate(values, services);
    if (FIELD_ORDER.some((field) => nextErrors[field])) {
      setErrors(nextErrors);
      setStatus({ type: "error", message: stallEnquiry.errorSummary });
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
      `Exhibition Name & Location: ${values.exhibition.trim()}`,
      `Stall Dimensions: ${values.dimensions.trim() || "Not specified"}`,
      `Event Date: ${values.eventDate || "Not specified"}`,
      `Required Services: ${services.join(", ")}`,
      "",
      "Project Details:",
      values.details.trim(),
    ];

    const mailto = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(
      `Stall Quote Request — ${values.exhibition.trim()} — ${values.name.trim()}`
    )}&body=${encodeURIComponent(body.join("\n"))}`;

    // Let the submitting state paint before the mail client takes over.
    window.requestAnimationFrame(() => {
      setStatus({ type: "success", message: stallEnquiry.successMessage });
      window.alert(stallEnquiry.successMessage);
      window.location.href = mailto;
    });
  };

  return (
    <section
      id="stall-enquiry"
      aria-labelledby="stall-enquiry-heading"
      className="relative isolate overflow-hidden bg-[var(--color-black)] py-24 scroll-mt-28 sm:py-32 sm:scroll-mt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_80%_-5%,rgba(192,196,201,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={reduceMotion ? undefined : { once: true, margin: "-60px" }}
          transition={reduceMotion ? undefined : { duration: 0.6, ease: EASE }}
          className="lg:col-span-5"
        >
          <SectionHeading
            id="stall-enquiry-heading"
            tone="dark"
            eyebrow={stallEnquiry.eyebrow}
            title={stallEnquiry.heading}
            body={stallEnquiry.body}
          />

          <div className="mt-10 space-y-3 text-sm text-[var(--color-silver)]">
            <p className="flex items-center gap-3">
              <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
              <a
                href={`mailto:${ENQUIRY_EMAIL}`}
                className="underline decoration-[var(--color-silver)]/40 underline-offset-4 transition-colors hover:text-white"
              >
                {ENQUIRY_EMAIL}
              </a>
            </p>
            {contactDetails.phone.numbers.map((number) => (
              <p key={number.dial} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-3 bg-[var(--color-silver)]/60" />
                <a
                  href={`tel:${number.dial}`}
                  className="transition-colors hover:text-white"
                >
                  {number.value}
                </a>
              </p>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={reduceMotion ? undefined : { once: true, margin: "-60px" }}
          transition={reduceMotion ? undefined : { duration: 0.65, delay: 0.08, ease: EASE }}
          noValidate
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
          className=" p-6 sm:p-8 lg:col-span-7"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col">
              <Label htmlFor="stall-name">Name</Label>
              <input
                id="stall-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                disabled={isSubmitting}
                value={values.name}
                onChange={handleChange}
                placeholder="Your full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "stall-name-error" : undefined}
                ref={(node) => {
                  fieldRefs.current.name = node;
                }}
                className={inputClass(Boolean(errors.name))}
              />
              <FieldError id="stall-name-error">{errors.name}</FieldError>
            </div>

            <div className="flex flex-col">
              <Label htmlFor="stall-company" optional>
                Company Name
              </Label>
              <input
                id="stall-company"
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
              <Label htmlFor="stall-email">Email</Label>
              <input
                id="stall-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isSubmitting}
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "stall-email-error" : undefined}
                ref={(node) => {
                  fieldRefs.current.email = node;
                }}
                className={inputClass(Boolean(errors.email))}
              />
              <FieldError id="stall-email-error">{errors.email}</FieldError>
            </div>

            <div className="flex flex-col">
              <Label htmlFor="stall-phone">Phone</Label>
              <input
                id="stall-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                disabled={isSubmitting}
                value={values.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "stall-phone-error" : undefined}
                ref={(node) => {
                  fieldRefs.current.phone = node;
                }}
                className={inputClass(Boolean(errors.phone))}
              />
              <FieldError id="stall-phone-error">{errors.phone}</FieldError>
            </div>

            <div className="flex flex-col sm:col-span-2">
              <Label htmlFor="stall-exhibition">
                Exhibition Name and Location
              </Label>
              <input
                id="stall-exhibition"
                name="exhibition"
                type="text"
                disabled={isSubmitting}
                value={values.exhibition}
                onChange={handleChange}
                placeholder="e.g. the exhibition name and the city or venue"
                aria-invalid={Boolean(errors.exhibition)}
                aria-describedby={
                  errors.exhibition ? "stall-exhibition-error" : undefined
                }
                ref={(node) => {
                  fieldRefs.current.exhibition = node;
                }}
                className={inputClass(Boolean(errors.exhibition))}
              />
              <FieldError id="stall-exhibition-error">
                {errors.exhibition}
              </FieldError>
            </div>

            <div className="flex flex-col">
              <Label htmlFor="stall-dimensions" optional>
                Stall Dimensions
              </Label>
              <input
                id="stall-dimensions"
                name="dimensions"
                type="text"
                disabled={isSubmitting}
                value={values.dimensions}
                onChange={handleChange}
                placeholder="e.g. 6m x 6m, or stall number"
                className={inputClass(false)}
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="stall-event-date" optional>
                Event Date
              </Label>
              <input
                id="stall-event-date"
                name="eventDate"
                type="date"
                disabled={isSubmitting}
                value={values.eventDate}
                onChange={handleChange}
                className={inputClass(false)}
              />
            </div>

            <fieldset className="flex flex-col sm:col-span-2">
              <legend className="mb-3 text-[11px] font-medium tracking-[0.18em] text-white uppercase">
                Required Services
                <span aria-hidden="true" className="ml-1 text-white">
                  *
                </span>
              </legend>
              <div
                className="grid gap-2.5 sm:grid-cols-2"
                ref={(node) => {
                  fieldRefs.current.services = node;
                }}
                tabIndex={-1}
                aria-invalid={Boolean(errors.services)}
                aria-describedby={
                  errors.services ? "stall-services-error" : undefined
                }
              >
                {stallServiceOptions.map((option) => (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors duration-200 ${
                      services.includes(option)
                        ? "border-white/75 text-white"
                        : "border-white/25 text-white hover:border-white/55"
                    } ${isSubmitting ? "opacity-60" : ""}`}
                  >
                    <input
                      type="checkbox"
                      name="services"
                      value={option}
                      disabled={isSubmitting}
                      checked={services.includes(option)}
                      onChange={() => toggleService(option)}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-silver)]"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <FieldError id="stall-services-error">{errors.services}</FieldError>
            </fieldset>

            <div className="flex flex-col sm:col-span-2">
              <Label htmlFor="stall-details">Project Details</Label>
              <textarea
                id="stall-details"
                name="details"
                rows={5}
                required
                disabled={isSubmitting}
                value={values.details}
                onChange={handleChange}
                placeholder="What are you exhibiting, and what should the stall achieve for you?"
                aria-invalid={Boolean(errors.details)}
                aria-describedby={errors.details ? "stall-details-error" : undefined}
                ref={(node) => {
                  fieldRefs.current.details = node;
                }}
                className={`${inputClass(Boolean(errors.details))} resize-y`}
              />
              <FieldError id="stall-details-error">{errors.details}</FieldError>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-[var(--color-graphite)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-light-silver)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-silver)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-black)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  {stallEnquiry.submittingLabel}
                  <Loader2 size={15} aria-hidden="true" className="animate-spin" />
                </>
              ) : (
                <>
                  {stallEnquiry.submitLabel}
                  <Send size={15} aria-hidden="true" />
                </>
              )}
            </button>

            <p className="text-xs leading-relaxed text-[var(--color-silver)]">
              {stallEnquiry.footerNote}
            </p>
          </div>

          {status && status.type !== "submitting" && (
            <p
              role={status.type === "error" ? "alert" : "status"}
              className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
                status.type === "error"
                  ? "border-[#fca5a5]/50 text-[#fca5a5]"
                  : "border-white/20 text-white"
              }`}
            >
              {status.type === "error" ? (
                <AlertCircle
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                />
              ) : (
                <CheckCircle2
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                />
              )}
              <span>{status.message}</span>
            </p>
          )}

          <p className="mt-6 flex flex-wrap items-center gap-2 text-xs text-[var(--color-silver)]">
            <Mail size={13} strokeWidth={1.8} aria-hidden="true" />
            {stallEnquiry.fallbackNote}
            <a
              href={`mailto:${ENQUIRY_EMAIL}`}
              className="underline decoration-[var(--color-silver)]/50 underline-offset-4 transition-colors hover:text-white"
            >
              {ENQUIRY_EMAIL}
            </a>
          </p>
        </motion.form>
      </div>
    </section>
  );
}
