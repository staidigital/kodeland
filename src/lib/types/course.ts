export interface SectionLink {
  text: string;
  anchor: string;
}

export interface Section {
  id: string;
  title: string;
  links?: SectionLink[];
}
