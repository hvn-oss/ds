import "./style.css";
import { Theme } from "@astryxdesign/core/theme";
import { themes, defaultThemeSlug } from "#/astryx-themes.ts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Theme theme={themes[defaultThemeSlug]}>{children}</Theme>;
}
