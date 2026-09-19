import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "../components/site/breadcrumbs";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Upscale Travels Pvt. Ltd." },
      { name: "description", content: "Privacy policy for Upscale Travels Pvt. Ltd., detailing how we protect your personal and travel-related data." },
    ],
  }),
});

function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 container-editorial max-w-4xl">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]} />
      <h1 className="mt-8 font-display text-5xl text-navy">Privacy Policy</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Last updated: September 19, 2026
      </p>

      <div className="mt-12 prose prose-slate prose-lg max-w-none">
        <p>
          At Upscale Travels Pvt. Ltd., we are committed to protecting your privacy in compliance with applicable international standards (such as GDPR) and the laws of Bangladesh, including the Digital Security Act.
        </p>

        <h2 className="mt-8 font-display text-2xl text-navy">Information We Collect</h2>
        <p className="mt-4">
          We collect information necessary to curate your journeys and process visas, including:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li><strong>Identity Data:</strong> Name, contact details, passport information, and visa application documents.</li>
          <li><strong>Travel Data:</strong> Itinerary preferences, dietary requirements, and special occasions.</li>
          <li><strong>Technical Data:</strong> Browser information, IP address, and usage data on our website.</li>
        </ul>

        <h2 className="mt-8 font-display text-2xl text-navy">How We Use Your Data</h2>
        <p className="mt-4">
          Your data is used solely for the following purposes:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>To design and book your custom travel itinerary.</li>
          <li>To manage visa application processes with relevant embassies.</li>
          <li>To provide 24/7 in-country support while you are traveling.</li>
          <li>To communicate important updates regarding your bookings.</li>
        </ul>

        <h2 className="mt-8 font-display text-2xl text-navy">Data Security</h2>
        <p className="mt-4">
          We implement industry-standard security measures to safeguard your personal information against unauthorized access, disclosure, or alteration, in compliance with Bangladeshi and international data protection laws.
        </p>

        <h2 className="mt-8 font-display text-2xl text-navy">Your Rights</h2>
        <p className="mt-4">
          Depending on your jurisdiction, you may have rights to access, rectify, or delete your personal data. Please contact us to exercise these rights.
        </p>

        <h2 className="mt-8 font-display text-2xl text-navy">Contact Us</h2>
        <p className="mt-4">
          If you have any questions regarding our privacy practices, please contact us:
        </p>
        <p className="mt-2">
          Upscale Travels Pvt. Ltd.<br />
          4/A Indira Road, Mahabub Plaza (4th Floor), Room No-503, Farmgate, Dhaka – 1215<br />
          Email: admin@upscale-travels.com
        </p>
      </div>
    </div>
  );
}
