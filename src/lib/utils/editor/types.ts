export type ParagraphBlock = {
  type: 'paragraph';
  text: string;
};

export type CodeBlock = {
  type: 'code';
  code: string;
  language: string;
  interactive: boolean;
};

export type ImageBlock = {
  type: 'image';
  src: string;
  alt: string;
  caption: string;
};

export type Block = ParagraphBlock | CodeBlock | ImageBlock;

export type Section = {
  id: string;
  title: string;
  blocks: Block[];
};
