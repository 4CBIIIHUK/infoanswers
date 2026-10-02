import { useEffect, useMemo, useState } from "react";
import { TestSection, accents } from "./components/TestSection";
import {
  BookIcon,
  CloseIcon,
  HeroDiagram,
  ListIcon,
  SearchIcon,
  SectionIcon,
} from "./components/Icons";
import { matchingTask, tests, totalAnswers, type Question } from "./data/tests";

function matchesQuery(question: Question, query: string, testTitle: string) {
  return [
    testTitle,
    question.id,
    question.label,
    question.title,
    question.context,
    question.code,
    question.expression,
    question.answer,
    question.explanation,
    question.options?.map((option) => option.text).join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("ru")
    .includes(query);
}

const matchingText = [
  tests.find((test) => test.id === matchingTask.sectionId)?.title,
  matchingTask.id,
  matchingTask.title,
  ...matchingTask.pairs.flatMap((pair) => [pair.left, pair.right]),
]
  .join(" ")
  .toLocaleLowerCase("ru");

export default function App() {
  const [activeId, setActiveId] = useState(tests[0].id);
  const [query, setQuery] = useState("");
  const search = query.trim().toLocaleLowerCase("ru");

  const filtered = useMemo(
    () =>
      tests.map((test, index) => ({
        ...test,
        number: index + 1,
        visibleQuestions: search
          ? test.questions.filter((question) => matchesQuery(question, search, test.title))
          : test.questions,
      })),
    [search],
  );

  const showMatching = !search || matchingText.includes(search);
  const resultCount =
    filtered.reduce((sum, test) => sum + test.visibleQuestions.length, 0) +
    (showMatching ? 1 : 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    tests.forEach((test) => {
      const element = document.getElementById(test.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [search]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#11172a]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 text-left"
            aria-label="Наверх"
          >
            <span className="flex h-9 w-9 items-center justify-center bg-indigo-500 text-white">
              <BookIcon size={19} />
            </span>
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                Информатика
              </span>
              <span className="block text-sm font-bold tracking-tight">ИнфоОтветы</span>
            </span>
          </button>

          <nav className="hidden items-center lg:flex" aria-label="Разделы">
            {tests.map((test, index) => (
              <button
                key={test.id}
                type="button"
                onClick={() => scrollTo(test.id)}
                className={`border-b-2 px-3.5 py-5 text-xs font-semibold transition-colors ${
                  activeId === test.id
                    ? "border-indigo-400 text-white"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <span className="mr-1.5 font-mono text-[10px] opacity-60">
                  0{index + 1}
                </span>
                {test.short}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 lg:hidden">
            <ListIcon size={18} />
            {tests.length} раздела
          </div>
        </div>
      </header>

      <section className="hero-grid relative overflow-hidden bg-[#11172a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(99,102,241,0.2),transparent_35%),radial-gradient(circle_at_82%_74%,rgba(45,212,191,0.12),transparent_28%)]" />
        <div className="relative mx-auto grid min-h-[430px] max-w-[1240px] items-center px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-16">
          <div className="hero-copy z-10 max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-indigo-300">
              <span className="h-px w-8 bg-indigo-400" />
              Справочник готовых ответов
            </p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[.95] tracking-[-0.055em] sm:text-7xl">
              Инфо<span className="text-indigo-400">Ответы</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Алгоритмы, языки программирования и два теста по массивам. Все ответы
              открыты сразу, с разбором и исходными вариантами.
            </p>

            <label className="mt-8 flex max-w-xl items-center gap-3 border border-white/15 bg-white/[.07] px-4 py-3.5 shadow-2xl shadow-black/10 transition-colors focus-within:border-indigo-400 focus-within:bg-white/[.1]">
              <SearchIcon className="shrink-0 text-indigo-300" />
              <span className="sr-only">Найти вопрос или ответ</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Найти вопрос, код или термин..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 sm:text-base"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-slate-400 transition-colors hover:text-white"
                  aria-label="Очистить поиск"
                >
                  <CloseIcon />
                </button>
              )}
              <span className="hidden shrink-0 border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-slate-400 sm:block">
                {search ? resultCount : totalAnswers} ответов
              </span>
            </label>
          </div>

          <div className="hero-visual pointer-events-none absolute -right-24 bottom-[-40px] h-[340px] w-[490px] opacity-25 sm:right-[-50px] sm:opacity-40 lg:relative lg:right-auto lg:bottom-auto lg:h-[360px] lg:w-full lg:opacity-100">
            <HeroDiagram />
          </div>
        </div>
      </section>

      <div className="border-b border-slate-200 bg-white lg:hidden">
        <nav
          className="mx-auto flex max-w-[1240px] overflow-x-auto px-4 sm:px-6"
          aria-label="Быстрая навигация"
        >
          {tests.map((test, index) => (
            <button
              key={test.id}
              type="button"
              onClick={() => scrollTo(test.id)}
              className="shrink-0 border-r border-slate-100 px-4 py-3 text-xs font-semibold text-slate-600 first:pl-0"
            >
              <span className="mr-1.5 font-mono text-[10px] text-slate-400">
                0{index + 1}
              </span>
              {test.short}
            </button>
          ))}
        </nav>
      </div>

      <main className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-14 pr-2">
            <p className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              <ListIcon size={16} />
              Оглавление
            </p>
            <nav className="space-y-6" aria-label="Оглавление заданий">
              {tests.map((test, index) => {
                const accent = accents[test.accent];
                const isActive = activeId === test.id;
                return (
                  <div key={test.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(test.id)}
                      className={`flex w-full items-center gap-3 text-left text-sm font-semibold transition-colors ${
                        isActive ? "text-slate-950" : "text-slate-500 hover:text-slate-950"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center ${
                          isActive ? `${accent.solid} text-white` : "bg-white text-slate-500"
                        }`}
                      >
                        <SectionIcon name={test.icon} size={16} />
                      </span>
                      <span>
                        <span className="mr-1 font-mono text-[10px] text-slate-400">
                          0{index + 1}
                        </span>
                        {test.title}
                      </span>
                    </button>
                    <div className="mt-2 grid grid-cols-5 gap-1 pl-11">
                      {test.questions.map((question) => (
                        <a
                          key={question.id}
                          href={`#${test.id}-${question.id}`}
                          className="py-1 text-center font-mono text-[10px] font-semibold text-slate-400 transition-colors hover:bg-white hover:text-slate-900"
                          aria-label={`${test.title}, задание ${question.label ?? question.id}`}
                        >
                          {question.label ?? question.id}
                        </a>
                      ))}
                      {test.id === matchingTask.sectionId && (
                        <a
                          href={`#${matchingTask.sectionId}-${matchingTask.id}`}
                          className="py-1 text-center font-mono text-[10px] font-semibold text-slate-400 transition-colors hover:bg-white hover:text-slate-900"
                        >
                          {matchingTask.id}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="min-w-0">
          {search && (
            <div className="mt-10 flex items-center justify-between border-b border-slate-200 pb-4">
              <p className="text-sm text-slate-600">
                По запросу{" "}
                <span className="font-semibold text-slate-950">«{query.trim()}»</span>{" "}
                найдено: {resultCount}
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Сбросить
              </button>
            </div>
          )}

          {resultCount > 0 ? (
            filtered.map((test) => {
              const hasContent =
                test.visibleQuestions.length > 0 ||
                (test.id === matchingTask.sectionId && showMatching);
              return hasContent ? (
                <TestSection
                  key={test.id}
                  test={test}
                  number={test.number}
                  questions={test.visibleQuestions}
                  showMatching={showMatching}
                />
              ) : null;
            })
          ) : (
            <div className="py-32 text-center">
              <SearchIcon size={32} className="mx-auto text-slate-300" />
              <h2 className="mt-4 text-xl font-bold text-slate-900">Ничего не найдено</h2>
              <p className="mt-2 text-sm text-slate-500">
                Попробуйте изменить формулировку запроса.
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Очистить поиск
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-10 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-4 py-8 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold text-slate-600">
            <BookIcon size={16} />
            ИнфоОтветы
          </div>
          <p>
            {tests.length} раздела · {totalAnswers} разобранных заданий
          </p>
        </div>
      </footer>
    </div>
  );
}
