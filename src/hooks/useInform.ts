import { useState } from 'react';

export type InformContent = {
  title: string;
  message: string;
};

const defaultContent: InformContent = {
  title: '',
  message: '',
};

export const useInform = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [content, setContent] = useState<InformContent>(defaultContent);

  const openInform = (title: string, message: string) => {
    setContent({ title, message });
    setIsOpen(true);
  };

  const closeInform = () => {
    setIsOpen(false);
    setContent(defaultContent);
  };

  return { isOpen, content, openInform, closeInform };
};