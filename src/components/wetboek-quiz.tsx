'use client';

import { useState } from 'react';
import { WETBOEK_ENTRIES, WETTEN, formatStraf, type StrafEntry } from '@/lib/wetboek-data';

interface Question {
  entry: StrafEntry;
  correct: string;
  options: string[];
}

function shuffle<T>(input: T[]): T[] {
  const copy = [...input];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuestions(count: number): Question[] {
  const chosen = shuffle(WETBOEK_ENTRIES).slice(0, count);

  return chosen.map((entry) => {
    const correct = formatStraf(entry.straf);
    const distractors: string[] = [];

    for (const candidate of shuffle(WETBOEK_ENTRIES.filter((e) => e.id !== entry.id))) {
      const text = formatStraf(candidate.straf);
      if (text !== correct && !distractors.includes(text)) distractors.push(text);
      if (distractors.length === 3) break;
    }

    return { entry, correct, options: shuffle([correct, ...distractors]) };
  });
}

const QUESTION_COUNTS = [5, 10, 15];

export function WetboekQuiz() {
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  function start(count: number) {
    setQuestionCount(count);
    setQuestions(buildQuestions(count));
    setIndex(0);
    setSelected(null);
    setScore(0);
  }

  function answer(option: string) {
    if (selected || !questions) return;
    setSelected(option);
    if (option === questions[index].correct) setScore((s) => s + 1);
  }

  function next() {
    setSelected(null);
    setIndex((i) => i + 1);
  }

  if (!questions) {
    return (
      <div className="not-prose my-6 flex flex-col items-center gap-4 rounded-lg border bg-fd-card p-8 text-center">
        <p className="text-sm text-fd-muted-foreground">Hoeveel vragen wil je?</p>
        <div className="flex gap-2">
          {QUESTION_COUNTS.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => start(count)}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-fd-accent"
            >
              {count}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const finished = index >= questions.length;

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="not-prose my-6 flex flex-col items-center gap-4 rounded-lg border bg-fd-card p-8 text-center">
        <p className="text-lg font-semibold">
          {score} / {questions.length} goed ({percentage}%)
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => start(questionCount)}
            className="rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
          >
            Opnieuw beginnen
          </button>
          <button
            type="button"
            onClick={() => setQuestions(null)}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-fd-accent"
          >
            Ander aantal vragen
          </button>
        </div>
      </div>
    );
  }

  const question = questions[index];

  return (
    <div className="not-prose my-6 flex flex-col gap-4 rounded-lg border bg-fd-card p-6">
      <div className="flex items-center justify-between text-xs text-fd-muted-foreground">
        <span>
          Vraag {index + 1} van {questions.length}
        </span>
        <span>Score: {score}</span>
      </div>

      <div>
        <p className="text-xs text-fd-muted-foreground">
          {WETTEN[question.entry.wet]} — {question.entry.artikel}
        </p>
        <p className="text-lg font-medium">Wat is de strafmaat voor: {question.entry.feit}?</p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {question.options.map((option) => {
          const isSelectedOption = selected === option;
          const isCorrectOption = option === question.correct;
          let stateClasses = 'border hover:bg-fd-accent';
          if (selected) {
            if (isCorrectOption) stateClasses = 'border-emerald-500 bg-emerald-500/10';
            else if (isSelectedOption) stateClasses = 'border-red-500 bg-red-500/10';
          }

          return (
            <button
              key={option}
              type="button"
              disabled={!!selected}
              onClick={() => answer(option)}
              className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${stateClasses}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected ? (
        <button
          type="button"
          onClick={next}
          className="self-start rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
        >
          {index + 1 < questions.length ? 'Volgende vraag' : 'Bekijk resultaat'}
        </button>
      ) : null}
    </div>
  );
}
