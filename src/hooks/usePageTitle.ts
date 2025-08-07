import { useEffect } from "react";

interface UsePageTitleOptions {
  title: string;
  subtitle?: string;
}

export const usePageTitle = ({ title, subtitle }: UsePageTitleOptions) => {
  useEffect(() => {
    const baseTitle = "To Do List - BTS.id Technical Test Case";
    let fullTitle = baseTitle;

    if (title) {
      fullTitle = subtitle
        ? `${title} - ${subtitle} | ${baseTitle}`
        : `${title} | ${baseTitle}`;
    }

    document.title = fullTitle;

    return () => {
      document.title = `${baseTitle} - Aplikasi Pembayaran Digital`;
    };
  }, [title, subtitle]);
};
