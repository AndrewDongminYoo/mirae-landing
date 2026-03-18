// CSS variable name → dot-path into tokens-studio.json (resolves to .value)
type CssSelector = ":root" | ".dark";
export const TOKEN_MAP: Record<CssSelector, Record<string, string>> = {
  ":root": {
    "--background": "color.role.light.scaffoldBackground",
    "--foreground": "color.role.light.onSurface",
    "--card": "color.role.light.surfaceContainer",
    "--card-foreground": "color.role.light.onSurface",
    "--primary": "color.role.light.primary",
    "--primary-foreground": "color.role.light.onPrimary",
    "--secondary": "color.role.light.secondaryContainer",
    "--secondary-foreground": "color.role.light.onSecondaryContainer",
    "--muted": "color.role.light.surface",
    "--muted-foreground": "color.role.light.onSurfaceVariant",
    "--destructive": "color.role.light.error",
    "--destructive-foreground": "color.role.light.onError",
    "--border": "color.role.light.outline",
    "--input": "color.role.light.outline", // intentionally same as --border
  },
  ".dark": {
    "--background": "color.role.dark.scaffoldBackground",
    "--foreground": "color.role.dark.onSurface",
    "--card": "color.role.dark.surfaceContainer",
    "--card-foreground": "color.role.dark.onSurface",
    "--primary": "color.role.dark.primary",
    "--primary-foreground": "color.role.dark.onPrimary",
    "--secondary": "color.role.dark.secondaryContainer",
    "--secondary-foreground": "color.role.dark.onSecondaryContainer",
    "--muted": "color.role.dark.surface",
    "--muted-foreground": "color.role.dark.onSurfaceVariant",
    "--destructive": "color.role.dark.error",
    "--destructive-foreground": "color.role.dark.onError",
    "--border": "color.role.dark.outline",
    "--input": "color.role.dark.outline", // intentionally same as --border
  },
};

// CSS variables intentionally NOT in TOKEN_MAP (web-only, never overwritten):
// --accent, --accent-blue, --ring, --popover, --popover-foreground,
// --chart-1..5, --sidebar-*, and all @theme inline variables
