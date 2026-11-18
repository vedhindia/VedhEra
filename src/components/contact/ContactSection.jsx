import EnquiryForm from "@/components/contact/EnquiryForm";
import ContactDetails from "@/components/contact/ContactDetails";

/** Two-column contact section with enquiry form and contact information. */
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
      </div>
    </section>
  );
}
