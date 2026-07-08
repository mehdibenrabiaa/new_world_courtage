import { Libre_Caslon_Text } from "next/font/google"

const _caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
})

export const libreCaslon = {
  ..._caslon,
  className: `${_caslon.className} caslon`,
}
