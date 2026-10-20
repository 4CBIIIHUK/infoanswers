import { useState, type ReactNode } from "react";
import type { PracticeQuestion } from "../data/tests";
import { CheckIcon, CopyIcon, InfoIcon } from "./Icons";

type Props = {
  question: PracticeQuestion;
  sectionId: string;
  accentHover: string;
};

const KEYWORDS = new Set([
  "var",
  "begin",
  "end",
  "if",
  "then",
  "else",
  "for",
  "to",
  "downto",
  "do",
  "of",
  "array",
  "integer",
  "longint",
  "and",
  "or",
  "not",
  "div",
  "mod",
  "read",
  "readln",
  "write",
  "writeln",
  "break",
]);

function renderNote(note: string) {
  return note.split(/`([^`]+)`/g).map((part, index) =>
    index % 2 === 1 ? (
      <code key={index} className="font-mono text-[12.5px] text-teal-800">
        {part}
      </code>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

function highlightLine(line: string): ReactNode {
  const commentAt = line.indexOf("//");
  const codePart = commentAt >= 0 ? line.slice(0, commentAt) : line;
  const commentPart = commentAt >= 0 ? line.slice(commentAt) : "";

  const tokens = codePart.split(/([A-Za-z_][A-Za-z0-9_]*|\d+)/);

  return (
    <>
      {tokens.map((token, index) => {
        if (KEYWORDS.has(token.toLowerCase())) {
          return (
            <span key={index} className="font-medium text-indigo-300">
              {token}
            </span>
          );
        }
        if (/^\d+$/.test(token)) {
          return (
            <span key={index} className="text-amber-300">
              {token}
            </span>
          );
        }
        return <span key={index}>{token}</span>;
      })}
      {commentPart && (
        <span className="text-slate-500 italic">{commentPart}</span>
      )}
    </>
  );
}

export function PracticeCard({ question, sectionId, accentHover }: Props) {
  const [copied, setCopied] = useState(false);
  const lines = question.code.split("\n");

  const copyCode = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(question.code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = question.code;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();

        const success = document.execCommand("copy");
        textarea.remove();
        if (!success) return;
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article
      id={`${sectionId}-${question.id}`}
      className="answer-entry scroll-mt-44 xl:scroll-mt-32 border-t border-slate-200 py-7 first:border-t-0 sm:py-9"
    >
      <div className="grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6">
        <a
          href={`#${sectionId}-${question.id}`}
          className={`h-fit w-fit font-mono text-sm font-bold tracking-tight text-slate-400 transition-colors ${accentHover}`}
          aria-label={`Ссылка на задание ${question.label}`}
        >
          {question.label}
        </a>

        <div className="min-w-0">
          <h4 className="max-w-3xl font-display text-[17px] font-semibold leading-relaxed text-slate-900 sm:text-xl">
            {question.title}
          </h4>

          <p className="mt-2 flex max-w-3xl items-start gap-2 text-sm leading-relaxed text-slate-500">
            <InfoIcon size={16} className="mt-0.5 shrink-0 text-teal-600" />
            <span>{renderNote(question.note)}</span>
          </p>

          <div className="mt-4 max-w-4xl overflow-hidden rounded-lg border border-slate-800 bg-[#11172a] shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-end gap-4 border-b border-white/10 bg-white/[.03] px-4 py-3">
              <button
                type="button"
                onClick={() => void copyCode()}
                className={`inline-flex min-h-8 items-center gap-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300 ${
                  copied ? "text-teal-300" : "text-slate-400 hover:text-white"
                }`}
                aria-label={copied ? "Код скопирован" : "Скопировать код"}
              >
                {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
                <span aria-live="polite">
                  {copied ? "Скопировано" : "Скопировать код"}
                </span>
              </button>
            </div>
            <pre
              className="max-h-[560px] overflow-auto py-4 font-mono text-[12px] leading-[1.75] text-slate-100 sm:text-[13px]"
              tabIndex={0}
              aria-label={`Решение задачи ${question.label} на Pascal`}
            >
              <code className="code-listing block min-w-max">
                {lines.map((line, index) => (
                  <span key={index} className="code-line block px-4 sm:px-5">
                    {line ? highlightLine(line) : " "}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </article>
  );
}
