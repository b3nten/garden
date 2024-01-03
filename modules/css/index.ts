import { createHooks, recommended } from "@css-hooks/react"

export const [styles, css] = createHooks({
  ...recommended,
  xs: "@media (min-width: 499px)",
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  xxl: "@media (min-width: 1536px)",
  short: "@media (max-height: 639px)",
})