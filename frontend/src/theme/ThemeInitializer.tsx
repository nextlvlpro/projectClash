import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    const applySystemTheme = () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    };

    applySystemTheme(); // Apply on load

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", applySystemTheme);

    return () => mediaQuery.removeEventListener("change", applySystemTheme);
  }, []);

  return null;
}
