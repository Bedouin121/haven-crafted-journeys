import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { packages, type Package } from "../../lib/data";
import { PackageCard } from "./package-card";
import { SectionHeading } from "./section-heading";
import { MagneticButton } from "./magnetic-button";

type Mood = "relaxing" | "adventurous";
type Landscape = "beach" | "mountains";
type Budget = "moderate" | "premium" | "luxury";
type Group = "solo-couple" | "family" | "group";
type Length = "short" | "medium" | "long";

type Answers = {
  mood?: Mood;
  landscape?: Landscape;
  budget?: Budget;
  group?: Group;
  length?: Length;
};

const questions = [
  {
    key: "mood" as const,
    question: "What kind of pace suits you?",
    options: [
      { value: "relaxing" as Mood, label: "Relaxing & unhurried" },
      { value: "adventurous" as Mood, label: "Active & adventurous" },
    ],
  },
  {
    key: "landscape" as const,
    question: "Beach or mountains?",
    options: [
      { value: "beach" as Landscape, label: "Coastal & beach" },
      { value: "mountains" as Landscape, label: "Mountains & wilderness" },
    ],
  },
  {
    key: "budget" as const,
    question: "What's your budget range?",
    options: [
      { value: "moderate" as Budget, label: "Under $6,000 / person" },
      { value: "premium" as Budget, label: "$6,000 – $9,000 / person" },
      { value: "luxury" as Budget, label: "$9,000+ / person" },
    ],
  },
  {
    key: "group" as const,
    question: "Who's traveling?",
    options: [
      { value: "solo-couple" as Group, label: "Solo or couple" },
      { value: "family" as Group, label: "Family with children" },
      { value: "group" as Group, label: "Group of friends" },
    ],
  },
  {
    key: "length" as const,
    question: "How long is your trip?",
    options: [
      { value: "short" as Length, label: "5–7 nights" },
      { value: "medium" as Length, label: "8–9 nights" },
      { value: "long" as Length, label: "10+ nights" },
    ],
  },
];

function matchPackages(answers: Answers): Package[] {
  const scored = packages.map((pkg) => {
    let score = 0;
    const m = pkg.mood;

    if (answers.mood === "relaxing" && (m.pace === "relaxing" || pkg.style === "Romantic" || pkg.style === "Cultural")) score += 2;
    if (answers.mood === "adventurous" && (m.pace === "adventurous" || pkg.style === "Adventure")) score += 2;
    if (answers.landscape === "beach" && m.landscape === "beach") score += 3;
    if (answers.landscape === "mountains" && m.landscape === "mountains") score += 3;
    if (answers.budget === "moderate" && pkg.price < 6500) score += 2;
    if (answers.budget === "premium" && pkg.price >= 6500 && pkg.price < 9500) score += 2;
    if (answers.budget === "luxury" && pkg.price >= 9500) score += 2;
    if (answers.group === "family" && pkg.style === "Family") score += 3;
    if (answers.group === "solo-couple" && (pkg.style === "Romantic" || pkg.style === "Cultural")) score += 1;
    if (answers.length === "short" && pkg.nights <= 7) score += 2;
    if (answers.length === "medium" && pkg.nights >= 8 && pkg.nights <= 9) score += 2;
    if (answers.length === "long" && pkg.nights >= 10) score += 2;

    return { pkg, score };
  });

  return scored
    .sort((a, b) => b.score - a.score || b.pkg.rating - a.pkg.rating)
    .slice(0, 3)
    .map((s) => s.pkg);
}

export function TripMoodFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<Package[] | null>(null);

  const current = questions[step];
  const finished = step >= questions.length;

  const select = (key: keyof Answers, value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step + 1 >= questions.length) {
      setResults(matchPackages(next as Answers));
      setStep(questions.length);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResults(null);
  };

  return (
    <section className="bg-secondary py-24 sm:py-32" aria-labelledby="mood-finder-heading">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Trip mood finder"
          title="Not sure where to start?"
          intro="Answer five quick questions and we'll suggest journeys from our catalog that match your travel style."
          align="center"
        />

        <div className="mt-12 max-w-2xl mx-auto">
          {!finished ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-border bg-card p-8 sm:p-10 card-elevated"
              >
                <p className="text-sm font-semibold text-teal mb-2">
                  Question {step + 1} of {questions.length}
                </p>
                <h3 id="mood-finder-heading" className="font-display text-2xl sm:text-3xl text-navy">
                  {current.question}
                </h3>
                <div className="mt-8 flex flex-col gap-3" role="group" aria-label={current.question}>
                  {current.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => select(current.key, opt.value)}
                      className="rounded-2xl border-2 border-border px-6 py-4 text-left text-lg font-medium text-navy hover:border-teal hover:bg-teal/5 transition-all duration-500 glow-focus"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : results ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-10">
                <h3 className="font-display text-3xl text-navy">Your matched journeys</h3>
                <p className="mt-3 text-lg text-muted-foreground">Based on your answers, we recommend these tours.</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((p, i) => (
                  <PackageCard key={p.slug} pkg={p} index={i} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <MagneticButton type="button" variant="secondary" onClick={reset}>
                  Start over
                </MagneticButton>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
