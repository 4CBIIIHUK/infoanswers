import { Fragment } from "react";
import {
  isPracticeQuestion,
  type Test,
  type TestQuestion,
} from "../data/tests";
import { MatchingCard } from "./MatchingCard";
import { QuestionCard } from "./QuestionCard";
import { PracticeCard } from "./PracticeCard";
import { SectionIcon } from "./Icons";

type Props = {
  test: Test;
  number: number;
  questions: TestQuestion[];
  showMatching: boolean;
};

export const accents = {
  indigo: {
    text: "text-indigo-600",
    hover: "hover:text-indigo-600",
    chip: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    line: "bg-indigo-600",
    solid: "bg-indigo-600",
    soft: "bg-indigo-500/10 text-indigo-700 ring-indigo-500/20",
  },
  teal: {
    text: "text-teal-600",
    hover: "hover:text-teal-600",
    chip: "bg-teal-50 text-teal-700 ring-teal-100",
    line: "bg-teal-500",
    solid: "bg-teal-600",
    soft: "bg-teal-500/10 text-teal-700 ring-teal-500/20",
  },
  amber: {
    text: "text-amber-600",
    hover: "hover:text-amber-600",
    chip: "bg-amber-50 text-amber-700 ring-amber-100",
    line: "bg-amber-500",
    solid: "bg-amber-600",
    soft: "bg-amber-500/10 text-amber-700 ring-amber-500/20",
  },
  rose: {
    text: "text-rose-600",
    hover: "hover:text-rose-600",
    chip: "bg-rose-50 text-rose-700 ring-rose-100",
    line: "bg-rose-500",
    solid: "bg-rose-600",
    soft: "bg-rose-500/10 text-rose-700 ring-rose-500/20",
  },
  emerald: {
    text: "text-emerald-600",
    hover: "hover:text-emerald-600",
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    line: "bg-emerald-500",
    solid: "bg-emerald-600",
    soft: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20",
  },
};

export function TestSection({ test, number, questions, showMatching }: Props) {
  const accent = accents[test.accent];
  const hasMatching = test.id === "arrays" && showMatching;

  const subsections = (test.subsections ?? []).map((subsection) => ({
    ...subsection,
    count: questions.filter(
      (question) =>
        isPracticeQuestion(question) && question.subsection === subsection.title,
    ).length,
  }));

  return (
    <section id={test.id} className="scroll-mt-32 py-10 sm:py-14 xl:scroll-mt-24">
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
          <h2 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-slate-950 font-display sm:text-4xl">
            {test.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            {test.description}
          </p>
          <div className={`mt-5 h-1 w-16 ${accent.line}`} />

          {subsections.length > 0 && (
            <nav
              className="mt-6 flex flex-wrap gap-2"
              aria-label={`Подразделы раздела ${test.title}`}
            >
              {subsections.map((subsection) => (
                <a
                  key={subsection.id}
                  href={`#${test.id}-${subsection.id}`}
                  className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ring-1 transition-all hover:-translate-y-0.5 ${accent.soft}`}
                >
                  {subsection.title}
                  <span className="font-mono text-[10px] opacity-70">
                    {subsection.count}
                  </span>
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <div className="sm:ml-[88px]">
        {questions.map((question, index) => {
          const subsection = isPracticeQuestion(question) ? question.subsection : null;
          const previousQuestion = questions[index - 1];
          const previousSubsection =
            previousQuestion && isPracticeQuestion(previousQuestion)
              ? previousQuestion.subsection
              : null;
          const showSubsection = subsection !== null && subsection !== previousSubsection;
          const meta = showSubsection
            ? subsections.find((item) => item.title === subsection)
            : undefined;

          return (
            <Fragment key={question.id}>
              {showSubsection && meta && (
                <div
                  id={`${test.id}-${meta.id}`}
                  className="scroll-mt-32 xl:scroll-mt-20"
                  aria-hidden="true"
                />
              )}
              {showSubsection && meta && (
                <header
                  className={`sticky top-[108px] xl:top-16 z-30 -mx-3 flex items-center justify-between gap-4 rounded-md border-b border-slate-200/80 bg-[#f6f7fb]/92 px-3 py-3 backdrop-blur-md ${
                    index === 0 ? "mt-1 border-b-0" : "mt-8"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-0.5 w-7 ${accent.line}`} />
                    <h3 className="text-sm font-bold text-slate-950 font-display sm:text-base">
                      {subsection}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {meta.count} заданий
                  </span>
                </header>
              )}
              {isPracticeQuestion(question) ? (
                <PracticeCard
                  question={question}
                  sectionId={test.id}
                  accentHover={accent.hover}
                />
              ) : (
                <QuestionCard
                  question={question}
                  sectionId={test.id}
                  accentHover={accent.hover}
                />
              )}
            </Fragment>
          );
        })}
        {hasMatching && <MatchingCard />}
      </div>
    </section>
  );
}
