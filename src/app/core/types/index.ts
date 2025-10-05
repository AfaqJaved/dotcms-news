
export type SupportedYears = 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 0;


export interface BlockEditorNode {
  type: string;
  content?: BlockEditorNode[];
  attrs?: {
    textAlign?: 'left' | 'right' | 'center' | 'justify';
    level?: number;
    width: number;
    height: number;
    mimeType: string;
    orientation: 'horizontal' | 'vertical';
    language: string;
    start?: number;
    indent?: number;
    href?: string;
    src?: string;
    alt?: string;
    title?: string;
    colspan?: number;
    rowspan?: number;
    data?: {
      title?: string;
      image?: string;
      inode: string;
      image1?: string;
      image2?: string;
      description?: string;
      retailPrice?: number;
      specifications1: Record<string, string>;
    }
    [key: string]: any;
  };
  marks?: BlockEditorNode[];
  text?: string;
}
