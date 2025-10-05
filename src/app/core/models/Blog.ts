import {BlockEditorNode} from '../types';

export interface Blog {
  identifier : string;
  title: string;
  publishDate: string;
  image: string; //image id
  blogContent: { content: BlockEditorNode[] };
}
