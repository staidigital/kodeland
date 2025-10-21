// types.ts

// --- Tekstblokk ---
export type ParagraphBlock = {
  type: 'paragraph';
  text: string;
  subtitle?: string;
};

// --- Listeblokker ---
export type ListBlock = {
  type: 'list' | 'list-ol';
  items: string[];
};

// --- Kodeblokker ---
export type CodeBlock = {
  type: 'code';
  code: string;
  language: string;
  preview?: boolean;
  interactive?: boolean;
  script?: string;
};

// --- Oppgaveblokk ---
export type TaskBlock = {
  type: 'task';
  number: number;
  title: string;
  description: string;
  solution?: string;
  code?: string;
};

// --- Sandbox-blokk ---
export type SandboxBlock = {
  type: 'sandbox';
  html?: string;
  js?: string;
  css?: string;
};

// --- Custom components ---
export type CustomBlock = {
  type: 'custom';
  component: string;
  props?: Record<string, any>;
};

// --- Image blocks ---
export type ImageBlock = {
  type: 'image';
  component: 'BlockImage';
  props: {
    src: string;
    alt: string;
    caption?: string;
  };
};

// --- Text with image blocks ---
export type TextWithImageBlock = {
  type: 'textwithimage';
  component: 'BlockTextWithImage';
  props: {
    image: string;
    alt?: string;
    text?: string;
    position?: 'left' | 'right';
    width?: string;
  };
};

// --- Table block ---
export type TableBlock = {
  type: 'table';
  headers: string[];
  rows: any[][];
};

// --- Alle blokker ---
export type Block =
  | ParagraphBlock
  | ListBlock
  | CodeBlock
  | TaskBlock
  | SandboxBlock
  | CustomBlock
  | ImageBlock
  | TextWithImageBlock
  | TableBlock;

// --- Seksjon ---
export type Section = {
  id?: string;
  title?: string;
  collapsible?: boolean;
  blocks: Block[];
};
