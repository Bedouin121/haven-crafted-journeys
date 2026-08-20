import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";

export type ProgramCategory = {
  id: string;
  title: string;
  programCount: number;
  universityCount: number;
  description: string;
  universities: string[];
  whyChoose: string;
};

const programs: ProgramCategory[] = [
  {
    id: "certificate",
    title: "Certificate Programs",
    programCount: 7,
    universityCount: 3,
    description:
      "Build focused, career-ready skills in under a year with certificate programs designed for quick entry into Malaysia's growing industries.",
    universities: ["Lincoln University College", "Asia Pacific University (APU)", "UOW Malaysia"],
    whyChoose:
      "Certificates are the fastest way to gain a recognized credential, sharpen practical skills, and test a field before committing to a longer degree.",
  },
  {
    id: "diploma",
    title: "Diploma Programs",
    programCount: 216,
    universityCount: 16,
    description:
      "Kickstart your journey with internationally recognized diploma programs across Malaysia's leading institutions, designed for smooth progression into bachelor's degrees.",
    universities: [
      "Kings University College",
      "Lincoln University College",
      "Universiti Tun Abdul Razak (UNIRAZAK)",
      "Universiti Tenaga Nasional (UNITEN)",
      "INTI International University",
      "Perdana University",
      "ALFA University College",
      "Universiti Kuala Lumpur (UniKL)",
      "City University Malaysia",
      "MAHSA University",
      "UCSI University",
      "Asia Pacific University (APU)",
      "University of Cyberjaya",
      "UOW Malaysia",
      "SEGi University & Colleges",
      "Management & Science University (MSU)",
    ],
    whyChoose:
      "Diplomas combine hands-on training with academic foundations, often with credit transfer into a degree, so you graduate faster and job-ready.",
  },
  {
    id: "foundation",
    title: "Foundation Programs",
    programCount: 38,
    universityCount: 12,
    description:
      "Bridge school and degree with foundation programs that strengthen academic English, subject knowledge, and university readiness in one intensive year.",
    universities: [
      "ALFA University College",
      "Perdana University",
      "Universiti Kuala Lumpur (UniKL)",
      "University of Malaya Wales (UM Wales)",
      "Universiti Tenaga Nasional (UNITEN)",
      "MAHSA University",
      "UCSI University",
      "Universiti Tun Abdul Razak (UNIRAZAK)",
      "City University Malaysia",
      "Asia Pacific University (APU)",
      "University of Cyberjaya",
      "UOW Malaysia",
    ],
    whyChoose:
      "A foundation year smooths the transition into a full degree, especially if you are adjusting to English-medium study or want to lock in your major.",
  },
  {
    id: "master",
    title: "Master Programs",
    programCount: 146,
    universityCount: 13,
    description:
      "Advance your career with postgraduate degrees in business, engineering, health sciences, and more at research-active Malaysian universities.",
    universities: [
      "Universiti Sultan Zainal Abidin (UniSZA)",
      "Lincoln University College",
      "Universiti Tenaga Nasional (UNITEN)",
      "Kings University College",
      "ALFA University College",
      "City University Malaysia",
      "UCSI University",
      "Perdana University",
      "University of Cyberjaya",
      "UOW Malaysia",
      "INTI International University",
      "MAHSA University",
      "SEGi University & Colleges",
    ],
    whyChoose:
      "Malaysia's master's degrees offer international faculty, English instruction, and strong industry links at a fraction of the cost of comparable Western programs.",
  },
  {
    id: "other",
    title: "Other Programs",
    programCount: 4,
    universityCount: 2,
    description:
      "Specialized pathways and professional development courses for learners with specific goals or unique academic backgrounds.",
    universities: ["UOW Malaysia", "INTI International University"],
    whyChoose:
      "When a standard category does not fit your plan, these targeted programs let you fill a gap, upgrade a qualification, or meet a niche requirement.",
  },
  {
    id: "phd",
    title: "PhD Programs",
    programCount: 60,
    universityCount: 12,
    description:
      "Pursue original research across disciplines with experienced supervisors, modern facilities, and competitive fees in a multicultural academic setting.",
    universities: [
      "Universiti Tenaga Nasional (UNITEN)",
      "Universiti Sultan Zainal Abidin (UniSZA)",
      "UCSI University",
      "INTI International University",
      "City University Malaysia",
      "University of Cyberjaya",
      "Kings University College",
      "Perdana University",
      "UOW Malaysia",
      "Lincoln University College",
      "SEGi University & Colleges",
      "MAHSA University",
    ],
    whyChoose:
      "A Malaysian PhD combines rigorous research supervision, welcoming international-student support, and lower living costs than most Western doctoral destinations.",
  },
];

const coreDocuments = [
  "University / College Offer Letter",
  "Passport Copy, Bio data and Visa Pages",
  "Passport Validity, 18 Months or More",
  "Passport Photo, White Background, 35mm x 45mm",
  "Health Declaration Form",
  "Academic Certificates and Transcripts",
];

const ifApplicable = [
  "English Test / MOI",
  "Certified English Translation",
  "CV, Research Proposal or Country Specific Documents",
];

const afterApprovalSteps = [
  "eVAL / VAL",
  "SEV if Required",
  "Post Arrival Medical Screening",
  "Student Pass Endorsement",
];

export function MalaysiaStudentProgramsPage() {
  const [selected, setSelected] = useState<ProgramCategory | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="pt-32 pb-24">
      <div className="container-editorial">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Student Visa", to: "/student-visa" },
            { label: "Malaysia Student Visa Programs" },
          ]}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-8 max-w-3xl"
        >
          <p className="text-eyebrow text-teal">Study in Malaysia</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] text-navy">
            Malaysia Student Visa Programs 2026 Portfolio
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Explore certificate, diploma, foundation, master, PhD and other pathways across Malaysia's top universities.
          </p>
        </motion.div>
      </div>

      <section className="container-editorial mt-16 sm:mt-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={i}
              onOpen={() => setSelected(program)}
            />
          ))}
        </div>
      </section>

      <section className="container-editorial mt-20 sm:mt-28">
        <div className="card-elevated hover-lift overflow-hidden">
          <div className="bg-navy px-8 py-6 sm:px-10 sm:py-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-teal/20 text-teal">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-primary-foreground">
                Student Visa Checklist, New Student Pass Application
              </h2>
            </div>
          </div>

          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-xl text-navy">Core Documents</h3>
              <ul className="mt-4 space-y-3">
                {coreDocuments.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-base text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xl text-navy">If Applicable</h3>
              <ul className="mt-4 space-y-3">
                {ifApplicable.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-base text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border px-8 pb-8 pt-6 sm:px-10 sm:pb-10">
            <h3 className="font-display text-xl text-navy">After Approval</h3>
            <ol className="mt-6 flex flex-wrap items-center gap-3" aria-label="After approval steps">
              {afterApprovalSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-navy">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-navy text-[10px] font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    {step}
                  </span>
                  {i < afterApprovalSteps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm italic text-muted-foreground">
              Always re check the latest requirements with EMGS and your institution.
            </p>
          </div>
        </div>
      </section>

      <section className="container-editorial mt-20 sm:mt-28">
        <div className="relative overflow-hidden rounded-4xl bg-navy px-8 py-16 sm:px-16 sm:py-24 text-center cta-sweep">
          <p className="text-eyebrow text-gold-soft">Ready to Apply?</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-primary-foreground leading-[1.05] max-w-2xl mx-auto">
            Start your Malaysian study journey today.
          </h2>
          <p className="mt-5 text-xl text-primary-foreground/80 max-w-xl mx-auto">
            Our education consultants will match your profile with the right program and guide you through every visa step.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-medium text-brand-navy hover:bg-gold-soft transition-colors duration-700"
          >
            Contact Us to Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ProgramModal program={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProgramCard({
  program,
  index,
  onOpen,
}: {
  program: ProgramCategory;
  index: number;
  onOpen: () => void;
}) {
  const preview = program.universities.slice(0, 4);
  const remaining = program.universities.length - preview.length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="card-elevated hover-lift group flex cursor-pointer flex-col overflow-hidden"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${program.title}`}
    >
      {/* Image placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-card">
              <span className="font-display text-sm text-navy">image</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-teal/10 px-3 py-1 text-sm font-semibold text-teal">
            {program.programCount} Programs
          </span>
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-navy">
            {program.universityCount} Universities
          </span>
        </div>

        <h3 className="font-display text-2xl text-navy leading-tight">{program.title}</h3>
        <p className="text-base text-muted-foreground leading-relaxed">{program.description}</p>

        <ul className="mt-1 space-y-1.5 text-sm text-muted-foreground">
          {preview.map((uni) => (
            <li key={uni} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" aria-hidden />
              <span>{uni}</span>
            </li>
          ))}
        </ul>
        {remaining > 0 && (
          <p className="text-sm font-semibold text-navy">+{remaining} more</p>
        )}

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy-soft glow-focus"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function ProgramModal({
  program,
  onClose,
}: {
  program: ProgramCategory;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-card shadow-deep max-h-[90vh] flex flex-col"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-card">
              <span className="font-display text-base text-navy">image</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-navy backdrop-blur transition-colors hover:bg-background"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="overflow-y-auto p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-teal/10 px-3 py-1 text-sm font-semibold text-teal">
              {program.programCount} Programs
            </span>
            <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-navy">
              {program.universityCount} Universities
            </span>
          </div>

          <h2 id="program-modal-title" className="mt-4 font-display text-3xl sm:text-4xl text-navy">
            {program.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{program.description}</p>

          <div className="mt-8">
            <h3 className="font-display text-xl text-navy">Partner universities</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {program.universities.map((uni) => (
                <li key={uni} className="flex items-start gap-2 text-base text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                  <span>{uni}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl bg-secondary p-6">
            <h3 className="font-display text-xl text-navy">Why choose this pathway</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{program.whyChoose}</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-base font-medium text-navy transition-colors hover:bg-secondary"
            >
              Close
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-navy-soft"
            >
              Contact Us to Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
