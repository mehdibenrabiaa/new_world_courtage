import { Google_Sans_Flex } from "next/font/google"

// Headings use the same sans-serif as the body text (see pages/_app.js).
const _headingSans = Google_Sans_Flex({
  subsets: ["latin"],
  weight: "variable",
  // slnt gives the emphasised words a real designed slant (see .heading-font em).
  axes: ["slnt"],
  display: "swap",
  fallback: ["-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
})

export const headingFont = {
  ..._headingSans,
  className: `${_headingSans.className} heading-font`,
}

// Former serif heading font; kept as an alias so existing imports keep working.
export const libreCaslon = headingFont
