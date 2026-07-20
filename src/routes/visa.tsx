import { createFileRoute } from "@tanstack/react-router";
import { VisaCatalog } from "../components/site/visa-catalog";

export const Route = createFileRoute("/visa")({
  head: () => ({
    meta: [
      { title: "Tourist Visa Services — Diganta Overseas" },
      {
        name: "description",
        content:
          "End-to-end tourist visa handling for destinations worldwide — document review, embassy submission, and status tracking.",
      },
      { property: "og:title", content: "Tourist Visa Services — Diganta Overseas" },
      { property: "og:description", content: "Expert tourist visa handling for every destination we serve." },
    ],
  }),
  component: TouristVisaPage,
});

function TouristVisaPage() {
  return (
    <VisaCatalog
      visaType="Tourist"
      copy={{
        eyebrow: "Tourist Visa",
        title: "We handle the paperwork.",
        intro:
          "Tourist visa requirements change, appointments are hard to get, and the wrong document can delay your trip. Diganta Overseas takes it off your plate — from document review to embassy submission and approval tracking.",
        heading: "Tourist visas",
        breadcrumb: "Tourist Visa",
      }}
    />
  );
}
