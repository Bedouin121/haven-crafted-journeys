import { createFileRoute } from "@tanstack/react-router";
import { VisaCatalog } from "../components/site/visa-catalog";

export const Route = createFileRoute("/student-visa")({
  head: () => ({
    meta: [
      { title: "Student Visa Services — Diganta Overseas" },
      {
        name: "description",
        content:
          "Student visa support for study abroad — institution verification, sponsorship, medicals, and pre-arrival guidance handled end to end.",
      },
      { property: "og:title", content: "Student Visa Services — Diganta Overseas" },
      { property: "og:description", content: "Study-abroad visa handling, done right the first time." },
    ],
  }),
  component: StudentVisaPage,
});

function StudentVisaPage() {
  return (
    <VisaCatalog
      visaType="Student"
      copy={{
        eyebrow: "Student Visa",
        title: "Study abroad, sorted.",
        intro:
          "Student visas involve institution letters, financial paperwork, medicals, and tight deadlines. Our specialists walk you through every step — from admission confirmation to embassy submission and pre-arrival guidance.",
        heading: "Student visas",
        breadcrumb: "Student Visa",
      }}
    />
  );
}
