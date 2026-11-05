import EnquiryForm from "@/components/contact/EnquiryForm";
import ContactDetails from "@/components/contact/ContactDetails";

/** Two-column contact section with enquiry form, contact information, and map. */
export default function ContactSection() {
  return (
    <section
      id="enquiry"
      aria-label="Project enquiry and contact information"
      className="w-full scroll-mt-24 bg-[var(--color-soft-white)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <EnquiryForm />
          <ContactDetails />
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-[var(--color-graphite)]/10 bg-white">
          <iframe
            title="VedhEra office location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.223881123532!2d73.8211733!3d18.6089973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9daffffffc7%3A0x725d6dd96d5aec71!2sVedhEra%20Media%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1793856873234!5m2!1sen!2sin"
            width="600"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-[360px] w-full border-0 sm:h-[420px]"
          />
        </div>
      </div>
    </section>
  );
}
