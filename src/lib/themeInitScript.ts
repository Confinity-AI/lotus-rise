import { dataStyle, style } from "@/resources/once-ui.config";

export function getThemeInitScript() {
  const config = {
    theme: style.theme,
    brand: style.brand,
    accent: style.accent,
    neutral: style.neutral,
    solid: style.solid,
    "solid-style": style.solidStyle,
    border: style.border,
    surface: style.surface,
    transition: style.transition,
    scaling: style.scaling,
    "viz-style": dataStyle.variant,
  };

  return `
    (function() {
      try {
        const root = document.documentElement;
        const config = ${JSON.stringify(config)};

        Object.entries(config).forEach(([key, value]) => {
          root.setAttribute('data-' + key, value);
        });

        const resolveTheme = (themeValue) => {
          if (!themeValue || themeValue === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          return themeValue;
        };

        const savedTheme = localStorage.getItem('data-theme');
        const finalTheme = savedTheme ?? config.theme;
        root.setAttribute('data-theme', resolveTheme(finalTheme));

        Object.keys(config).forEach((key) => {
          const value = localStorage.getItem('data-' + key);
          if (value) {
            root.setAttribute('data-' + key, value);
          }
        });
      } catch (e) {
        console.error('Failed to initialize theme:', e);
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  `;
}
