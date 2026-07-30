"use client";

import { useState } from "react";
import { Sparkles, Bot, MessageSquare, BookOpen, Send, Loader2, CheckCircle, HelpCircle } from "lucide-react";
import { aiAssistant, AISummaryResult, AIAnswerResult } from "@/lib/ai/ai-assistant";

interface AIAssistantDrawerProps {
  bookTitle: string;
  chapterTitle: string;
  chapterText: string;
  onClose: () => void;
}

export default function AIAssistantDrawer({
  bookTitle,
  chapterTitle,
  chapterText,
  onClose,
}: AIAssistantDrawerProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "qa">("summary");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryData, setSummaryData] = useState<AISummaryResult | null>(null);

  const [question, setQuestion] = useState("");
  const [loadingQA, setLoadingQA] = useState(false);
  const [qaHistory, setQaHistory] = useState<Array<{ q: string; a: AIAnswerResult }>>([]);

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    try {
      const res = await aiAssistant.summarizeChapter(bookTitle, chapterTitle, chapterText);
      setSummaryData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userQ = question;
    setQuestion("");
    setLoadingQA(true);

    try {
      const res = await aiAssistant.askChapterQuestion(bookTitle, chapterTitle, chapterText, userQ);
      setQaHistory((prev) => [{ q: userQ, a: res }, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQA(false);
    }
  };

  return (
    <div className="absolute right-6 top-16 z-50 flex h-[520px] w-80 flex-col rounded-3xl border border-stone-300/80 bg-white/95 p-5 text-stone-900 shadow-2xl backdrop-blur-xl dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 sm:w-96">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-900 text-amber-100 dark:bg-amber-100 dark:text-stone-950">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
              AI Reading Assistant
            </h3>
            <p className="text-[10px] text-stone-500 dark:text-stone-400">{chapterTitle}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-xs font-bold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
        >
          Close
        </button>
      </div>

      {/* Tabs */}
      <div className="my-3 grid grid-cols-2 gap-1.5 rounded-xl bg-stone-100 p-1 dark:bg-stone-800">
        <button
          onClick={() => setActiveTab("summary")}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition ${
            activeTab === "summary"
              ? "bg-white text-stone-900 shadow dark:bg-stone-900 dark:text-stone-100"
              : "text-stone-600 dark:text-stone-400"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" /> Summary
        </button>
        <button
          onClick={() => setActiveTab("qa")}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition ${
            activeTab === "qa"
              ? "bg-white text-stone-900 shadow dark:bg-stone-900 dark:text-stone-100"
              : "text-stone-600 dark:text-stone-400"
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" /> Ask AI
        </button>
      </div>

      {/* Tab Content */}
      <div className="no-scrollbar flex-1 overflow-y-auto">
        {activeTab === "summary" ? (
          <div>
            {!summaryData && !loadingSummary && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Bot className="h-10 w-10 text-stone-400" />
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                  Generate an AI summary & key takeaways for {chapterTitle}.
                </p>
                <button
                  onClick={handleGenerateSummary}
                  className="mt-4 flex items-center gap-1.5 rounded-full bg-amber-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-amber-800 dark:bg-amber-100 dark:text-stone-950 dark:hover:bg-amber-200"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Summarize Chapter
                </button>
              </div>
            )}

            {loadingSummary && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-amber-800 dark:text-amber-300" />
                <p className="mt-3 text-xs font-medium text-stone-500">Analyzing text structure...</p>
              </div>
            )}

            {summaryData && (
              <div className="space-y-4">
                <div className="rounded-xl bg-amber-50/80 p-3 dark:bg-amber-950/40">
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    Chapter Summary
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                    {summaryData.summary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Key Takeaways
                  </h4>
                  <ul className="mt-2 space-y-2 text-xs text-stone-600 dark:text-stone-300">
                    {summaryData.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between">
            <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto pr-1">
              {qaHistory.length === 0 && !loadingQA && (
                <div className="flex flex-col items-center justify-center py-10 text-center text-xs text-stone-500">
                  <HelpCircle className="h-8 w-8 text-stone-400" />
                  <p className="mt-2">Ask any question about {chapterTitle}.</p>
                </div>
              )}

              {qaHistory.map((item, i) => (
                <div key={i} className="space-y-1.5 text-xs">
                  <div className="rounded-xl bg-stone-100 p-2.5 font-medium text-stone-800 dark:bg-stone-800 dark:text-stone-200">
                    Q: {item.q}
                  </div>
                  <div className="rounded-xl bg-amber-50/80 p-2.5 leading-relaxed text-stone-700 dark:bg-amber-950/40 dark:text-stone-300">
                    <p>{item.a.answer}</p>
                    <p className="mt-1.5 italic text-amber-900/80 dark:text-amber-300/80">
                      {item.a.relevantQuote}
                    </p>
                  </div>
                </div>
              ))}

              {loadingQA && (
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking...
                </div>
              )}
            </div>

            <form onSubmit={handleAskQuestion} className="mt-3 flex gap-1.5">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about this chapter..."
                className="flex-1 rounded-full border border-stone-300 bg-stone-50 px-3.5 py-2 text-xs text-stone-900 outline-none focus:border-amber-700 dark:border-stone-700 dark:bg-stone-850 dark:text-stone-100"
              />
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-900 text-white dark:bg-amber-100 dark:text-stone-950"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
