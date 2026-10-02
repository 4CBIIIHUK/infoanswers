import type { Question } from "../data/tests";
import { AlertIcon, CheckIcon, ChevronIcon, InfoIcon } from "./Icons";

type Props = {
  question: Question;
  sectionId: string;
  accentHover: string;
};

function buildAnswerText(question: Question) {
  const isBareNumber = /^\d+(\s*,\s*\d+)*$/.test(question.answer.trim());

  if (isBareNumber && question.options && question.answerKeys) {
    return question.options
      .filter((option) => question.answerKeys?.includes(option.label))
      .map((option) => `${option.label}) ${option.text}`)
      .join(question.optionsMono ? "\n" : "; ");
  }

  return question.answer;
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre
      className="mt-4 max-w-3xl overflow-x-auto border-l-2 border-slate-800 bg-slate-900 px-5 py-4 font-mono text-[13px] leading-relaxed text-slate-100"
      tabIndex={0}
      aria-label="Фрагмент программы на Pascal"
    >
      <code>{code}</code>
    </pre>
  );
}

export function QuestionCard({ question, sectionId, accentHover }: Props) {
  const isUncertain = question.answer.startsWith("Точный ответ дать невозможно");
  const answerText = buildAnswerText(question);
  const questionLabel = question.label ?? question.id;
  const answerIsCode = question.answerMono || question.optionsMono;

  return (
    <article
      id={`${sectionId}-${question.id}`}
      className="answer-entry scroll-mt-28 border-t border-slate-200 py-7 first:border-t-0 sm:py-9"
    >
      <div className="grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6">
        <a
          href={`#${sectionId}-${question.id}`}
          className={`h-fit w-fit font-mono text-sm font-bold tracking-tight text-slate-400 transition-colors ${accentHover}`}
          aria-label={`Ссылка на задание ${questionLabel}`}
        >
          {questionLabel}
        </a>

        <div className="min-w-0">
          {question.context && (
            <p className="text-sm font-medium leading-relaxed text-slate-600">
              {question.context}
            </p>
          )}
          {question.codeBeforeTitle && question.code && (
            <div className="mb-4">
              <CodeBlock code={question.code} />
            </div>
          )}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="max-w-3xl whitespace-pre-line text-[17px] font-semibold leading-relaxed text-slate-900 sm:text-lg">
              {question.title}
            </h3>
            {question.multiple && (
              <span className="shrink-0 bg-slate-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                несколько ответов
              </span>
            )}
          </div>

          {!question.codeBeforeTitle && question.code && (
            <CodeBlock code={question.code} />
          )}
          {question.expression && (
            <p className="mt-3 text-lg font-semibold text-slate-900">
              <code className="font-mono">{question.expression}</code>
            </p>
          )}

          <div
            className={`mt-4 flex items-start gap-3 border-l-2 py-1 pl-4 ${
              isUncertain ? "border-amber-400" : "border-emerald-500"
            }`}
          >
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                isUncertain
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {isUncertain ? <AlertIcon size={15} /> : <CheckIcon size={16} />}
            </span>
            <div className="min-w-0">
              <p
                className={`text-[11px] font-bold uppercase tracking-[0.14em] ${
                  isUncertain ? "text-amber-700" : "text-emerald-700"
                }`}
              >
                {isUncertain
                  ? "Примечание к ответу"
                  : question.multiple
                    ? "Правильные ответы"
                    : "Правильный ответ"}
              </p>
              <p
                className={`mt-1 break-words font-semibold leading-relaxed text-slate-900 ${
                  answerIsCode
                    ? "whitespace-pre-wrap font-mono text-[13px]"
                    : "whitespace-pre-line text-base"
                }`}
              >
                {answerIsCode ? <code>{answerText}</code> : answerText}
              </p>
            </div>
          </div>

          {question.explanation && (
            <div className="mt-4 flex max-w-3xl items-start gap-3 bg-indigo-50/70 px-4 py-3 text-sm leading-relaxed text-slate-700">
              <InfoIcon size={18} className="mt-0.5 shrink-0 text-indigo-600" />
              <p>
                <span className="font-semibold text-slate-900">Почему: </span>
                {question.explanation}
              </p>
            </div>
          )}

          {question.options && (
            <details className="options-details mt-4 max-w-3xl text-sm">
              <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-medium text-slate-500 transition-colors hover:text-slate-900">
                <ChevronIcon className="chevron transition-transform" />
                Все варианты ответа ({question.options.length})
              </summary>
              <ol className="mt-3 space-y-1.5">
                {question.options.map((option) => {
                  const correct = question.answerKeys?.includes(option.label);
                  return (
                    <li
                      key={option.label}
                      className={`flex items-start gap-3 px-3 py-2.5 leading-relaxed ${
                        correct
                          ? "bg-emerald-50 text-emerald-950"
                          : "text-slate-500"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center font-mono text-xs font-bold ${
                          correct
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {option.label}
                      </span>
                      <span
                        className={
                          question.optionsMono
                            ? `min-w-0 whitespace-pre-wrap font-mono text-[12.5px] ${
                                correct ? "font-semibold" : ""
                              }`
                            : `min-w-0 ${correct ? "font-medium" : ""}`
                        }
                      >
                        {option.text}
                      </span>
                      {correct && (
                        <CheckIcon
                          size={15}
                          className="ml-auto mt-0.5 shrink-0 text-emerald-700"
                        />
                      )}
                    </li>
                  );
                })}
              </ol>
            </details>
          )}
        </div>
      </div>
    </article>
  );
}
