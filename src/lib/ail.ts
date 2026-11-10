// The AI Influence Level scale (version 2.0) by Daniel Miessler,
// https://danielmiessler.com/blog/ai-influence-level-ail. The level names are his; the German
// names and the one-line meanings are this site's own wording.

export type Lang = 'en' | 'de';
export type Ail = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const ailSource = 'https://danielmiessler.com/blog/ai-influence-level-ail';

export const ailPage: Record<Lang, string> = {
  en: '/ai-influence-level/',
  de: '/ai-influence-level/de/',
};

export const ailLevels: { level: Ail; name: Record<Lang, string>; meaning: Record<Lang, string> }[] = [
  {
    level: 0,
    name: { en: 'Human Created, No AI Involved', de: 'Von Menschen geschaffen, ohne KI' },
    meaning: {
      en: 'I wrote it. No AI touched the text.',
      de: 'Ich habe ihn geschrieben. Keine KI hat den Text angefasst.',
    },
  },
  {
    level: 1,
    name: { en: 'Human Created, Minor AI Assistance', de: 'Von Menschen geschaffen, geringe KI-Unterstützung' },
    meaning: {
      en: 'I wrote it. An AI only tidied it: spelling, grammar, a sentence here and there.',
      de: 'Ich habe ihn geschrieben. Eine KI hat nur geglättet: Rechtschreibung, Grammatik, hier und da ein Satz.',
    },
  },
  {
    level: 2,
    name: { en: 'Human Created, Major AI Augmentation', de: 'Von Menschen geschaffen, umfassende KI-Erweiterung' },
    meaning: {
      en: 'I wrote it. An AI added to it, rather than only tidying it.',
      de: 'Ich habe ihn geschrieben. Eine KI hat etwas ergänzt, statt nur zu glätten.',
    },
  },
  {
    level: 3,
    name: { en: 'AI Created, Human Full Structure', de: 'Von KI geschaffen, Struktur vollständig vom Menschen' },
    meaning: {
      en: 'An AI wrote the text. The structure of the finished text is mine: what goes where, and why.',
      de: 'Eine KI hat den Text geschrieben. Die Struktur des fertigen Texts ist meine: was wohin gehört und warum.',
    },
  },
  {
    level: 4,
    name: { en: 'AI Created, Human Basic Idea', de: 'Von KI geschaffen, Grundidee vom Menschen' },
    meaning: {
      en: 'An AI wrote the text from my idea and gave it its structure, and I checked and edited the result.',
      de: 'Eine KI hat den Text aus meiner Idee geschrieben und ihm seine Struktur gegeben, ich habe das Ergebnis geprüft und überarbeitet.',
    },
  },
  {
    level: 5,
    name: { en: 'AI Created, Human Request', de: 'Von KI geschaffen, auf menschliche Anfrage' },
    meaning: {
      en: 'I asked for it. The AI came up with the idea itself.',
      de: 'Ich habe darum gebeten. Die Idee kam von der KI selbst.',
    },
  },
  {
    level: 6,
    name: { en: 'AI Initiated, No Human Involvement', de: 'Von KI initiiert, ohne menschliche Beteiligung' },
    meaning: {
      en: 'Nobody asked. An AI decided on its own that the piece should exist.',
      de: 'Niemand hat darum gebeten. Eine KI hat selbst entschieden, dass es den Text geben soll.',
    },
  },
];

export function ailName(level: Ail, lang: Lang): string {
  return ailLevels[level].name[lang];
}
