import { matchingTask } from "../data/tests";
import { ArrowIcon, CheckIcon } from "./Icons";

export function MatchingCard() {
  return (
    <article
      id="arrays-S1"
      className="answer-entry scroll-mt-28 border-t border-slate-200 py-7 sm:py-9"
    >
      <div className="grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6">
        <a
          href="#arrays-S1"
          className="question-index h-fit w-fit font-mono text-sm font-bold text-slate-400 transition-colors hover:text-rose-600"
        >
          S1
        </a>
        <div className="min-w-0">
          <h3 className="text-[17px] font-semibold leading-relaxed text-slate-900 sm:text-lg">
            {matchingTask.title}
          </h3>

          <div className="mt-5 overflow-x-auto border-y border-slate-200">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-[11px] uppercase tracking-[0.12em] text-slate-500">
                  <th className="px-4 py-3 font-semibold">Фрагмент или значение</th>
                  <th className="w-12 px-2 py-3" aria-label="соответствует" />
                  <th className="px-4 py-3 font-semibold">Правильное соответствие</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {matchingTask.pairs.map((pair, index) => (
                  <tr key={pair.left} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-4 py-4 text-slate-800">
                      <span className="mr-3 font-mono text-xs text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <code className="font-mono text-[13px]">{pair.left}</code>
                    </td>
                    <td className="px-2 py-4 text-emerald-600">
                      <ArrowIcon size={17} />
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-900">
                      <span className="flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <CheckIcon size={13} />
                        </span>
                        {pair.right}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>
  );
}