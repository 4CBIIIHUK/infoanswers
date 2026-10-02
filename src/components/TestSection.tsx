import type { Question, Test } from "../data/tests";
import { MatchingCard } from "./MatchingCard";
import { QuestionCard } from "./QuestionCard";
import { SectionIcon } from "./Icons";

type Props = {
  test: Test;
  number: number;
  questions: Question[];
  showMatching: boolean;
};

export const accents = {
  indigo: {
    text: "text-indigo-600",
    hover: "hover:text-indigo-600",
    chip: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    line: "bg-indigo-600",
    solid: "bg-indigo-600",
  },
  teal: {
    text: "text-teal-600",
    hover: "hover:text-teal-600",
    chip: "bg-teal-50 text-teal-700 ring-teal-100",
    line: "bg-teal-500",
    solid: "bg-teal-600",
  },
  amber: {
    text: "text-amber-600",
    hover: "hover:text-amber-600",
    chip: "bg-amber-50 text-amber-700 ring-amber-100",
    line: "bg-amber-500",
    solid: "bg-amber-600",
  },
  rose: {
    text: "text-rose-600",
    hover: "hover:text-rose-600",
    chip: "bg-rose-50 text-rose-700 ring-rose-100",
    line: "bg-rose-500",
    solid: "bg-rose-600",
  },
};

export function TestSection({ test, number, questions, showMatching }: Props) {
  const accent = accents[test.accent];
  const hasMatching = test.id === "arrays" && showMatching;

  return (
    <section id={test.id} className="scroll-mt-24 py-10 sm:py-14">
      <header className="mb-5 grid gap-5 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${accent.chip}`}
        >
          <SectionIcon name={test.icon} size={23} />
        </div>
        <div>
          <p
            className={`font-mono text-xs font-bold uppercase tracking-[0.2em] ${accent.text}`}
          >
            Раздел {String(number).padStart(2, "0")} · {test.subtitle}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            {test.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            {test.description}
          </p>
          <div className={`mt-5 h-1 w-16 ${accent.line}`} />
        </div>
      </header>

      <div className="sm:ml-[88px]">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            sectionId={test.id}
            accentHover={accent.hover}
          />
        ))}
        {hasMatching && <MatchingCard />}
      </div>
    </section>
  );
}
