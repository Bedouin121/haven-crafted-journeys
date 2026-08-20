import { createFileRoute } from "@tanstack/react-router";
import { MalaysiaStudentProgramsPage } from "../components/site/malaysia-student-programs";

export const Route = createFileRoute("/malaysia-student-visa")({
  head: () => ({
    meta: [
      { title: "Malaysia Student Visa Programs — Upscale Travel" },
      {
        name: "description",
        content:
          "Explore Malaysia student visa pathways, universities, documents, and application steps for certificate, diploma, foundation, master, and PhD programs.",
      },
      { property: "og:title", content: "Malaysia Student Visa Programs — Upscale Travel" },
      {
        property: "og:description",
        content: "Find the right Malaysian study pathway and get expert visa guidance from start to student pass approval.",
      },
    ],
  }),
  component: MalaysiaStudentVisaPage,
});

function MalaysiaStudentVisaPage() {
  return <MalaysiaStudentProgramsPage />;
}
