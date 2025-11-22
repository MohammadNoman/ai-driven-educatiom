import { ReactNode } from 'react';

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
}

export interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  criteria: string[];
}

export interface ChapterContent {
  id: string;
  title: string;
  path: string;
  description: string;
  content: ReactNode;
  toc?: { id: string; text: string; level: number }[];
}

export interface SidebarItem {
  type: 'category' | 'link';
  label: string;
  items?: SidebarItem[];
  path?: string;
  id?: string;
}

export type DocContextType = {
  activePath: string;
  setActivePath: (path: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};