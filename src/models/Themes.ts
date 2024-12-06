import { changeHue } from '@/Utils'

const colorBrownExtraLight = '#f8f9fa'
const colorBrownSuperLight = '#e3d4c8'
const colorBrownLighter = '#d8c6b7'
const colorBrownLight = '#d2bba8'
const colorBrownMediumLight = '#876a41'
const colorBrownMedium = '#775a32'
const colorBrownDark = '#816a57'

const yellowHue = 20
const khakiHue = 40
const greenHue = 80
const tealHue = 120
const bluegrayHue = 160
const blueHue = 200
const purpleHue = 240
const pinkHue = 280
const redHue = 320

export interface ITheme {
  name: string
  extraLight: string
  superLight: string
  lighter: string
  light: string
  mediumLight: string
  medium: string
  dark: string
}

const themes: Record<string, ITheme> = {
  brown: {
    name: 'Brown',
    extraLight: colorBrownExtraLight,
    superLight: colorBrownSuperLight,
    lighter: colorBrownLighter,
    light: colorBrownLight,
    mediumLight: colorBrownMediumLight,
    medium: colorBrownMedium,
    dark: colorBrownDark,
  },
  yellow: {
    name: 'Yellow',
    extraLight: changeHue(colorBrownExtraLight, yellowHue),
    superLight: changeHue(colorBrownSuperLight, yellowHue),
    lighter: changeHue(colorBrownLighter, yellowHue),
    light: changeHue(colorBrownLight, yellowHue),
    mediumLight: changeHue(colorBrownMediumLight, yellowHue),
    medium: changeHue(colorBrownMedium, yellowHue),
    dark: changeHue(colorBrownDark, yellowHue),
  },
  khaki: {
    name: 'Khaki',
    extraLight: changeHue(colorBrownExtraLight, khakiHue),
    superLight: changeHue(colorBrownSuperLight, khakiHue),
    lighter: changeHue(colorBrownLighter, khakiHue),
    light: changeHue(colorBrownLight, khakiHue),
    mediumLight: changeHue(colorBrownMediumLight, khakiHue),
    medium: changeHue(colorBrownMedium, khakiHue),
    dark: changeHue(colorBrownDark, khakiHue),
  },
  green: {
    name: 'Green',
    extraLight: changeHue(colorBrownExtraLight, greenHue),
    superLight: changeHue(colorBrownSuperLight, greenHue),
    lighter: changeHue(colorBrownLighter, greenHue),
    light: changeHue(colorBrownLight, greenHue),
    mediumLight: changeHue(colorBrownMediumLight, greenHue),
    medium: changeHue(colorBrownMedium, greenHue),
    dark: changeHue(colorBrownDark, greenHue),
  },
  teal: {
    name: 'Teal',
    extraLight: changeHue(colorBrownExtraLight, tealHue),
    superLight: changeHue(colorBrownSuperLight, tealHue),
    lighter: changeHue(colorBrownLighter, tealHue),
    light: changeHue(colorBrownLight, tealHue),
    mediumLight: changeHue(colorBrownMediumLight, tealHue),
    medium: changeHue(colorBrownMedium, tealHue),
    dark: changeHue(colorBrownDark, tealHue),
  },
  bluegray: {
    name: 'Blue Gray',
    extraLight: changeHue(colorBrownExtraLight, bluegrayHue),
    superLight: changeHue(colorBrownSuperLight, bluegrayHue),
    lighter: changeHue(colorBrownLighter, bluegrayHue),
    light: changeHue(colorBrownLight, bluegrayHue),
    mediumLight: changeHue(colorBrownMediumLight, bluegrayHue),
    medium: changeHue(colorBrownMedium, bluegrayHue),
    dark: changeHue(colorBrownDark, bluegrayHue),
  },
  blue: {
    name: 'Blue',
    extraLight: changeHue(colorBrownExtraLight, blueHue),
    superLight: changeHue(colorBrownSuperLight, blueHue),
    lighter: changeHue(colorBrownLighter, blueHue),
    light: changeHue(colorBrownLight, blueHue),
    mediumLight: changeHue(colorBrownMediumLight, blueHue),
    medium: changeHue(colorBrownMedium, blueHue),
    dark: changeHue(colorBrownDark, blueHue),
  },
  purple: {
    name: 'Purple',
    extraLight: changeHue(colorBrownExtraLight, purpleHue),
    superLight: changeHue(colorBrownSuperLight, purpleHue),
    lighter: changeHue(colorBrownLighter, purpleHue),
    light: changeHue(colorBrownLight, purpleHue),
    mediumLight: changeHue(colorBrownMediumLight, purpleHue),
    medium: changeHue(colorBrownMedium, purpleHue),
    dark: changeHue(colorBrownDark, purpleHue),
  },
  pink: {
    name: 'Pink',
    extraLight: changeHue(colorBrownExtraLight, pinkHue),
    superLight: changeHue(colorBrownSuperLight, pinkHue),
    lighter: changeHue(colorBrownLighter, pinkHue),
    light: changeHue(colorBrownLight, pinkHue),
    mediumLight: changeHue(colorBrownMediumLight, pinkHue),
    medium: changeHue(colorBrownMedium, pinkHue),
    dark: changeHue(colorBrownDark, pinkHue),
  },
  red: {
    name: 'Red',
    extraLight: changeHue(colorBrownExtraLight, redHue),
    superLight: changeHue(colorBrownSuperLight, redHue),
    lighter: changeHue(colorBrownLighter, redHue),
    light: changeHue(colorBrownLight, redHue),
    mediumLight: changeHue(colorBrownMediumLight, redHue),
    medium: changeHue(colorBrownMedium, redHue),
    dark: changeHue(colorBrownDark, redHue),
  },
}

export default themes

export function applyTheme(element: HTMLElement, theme: ITheme) {
  const style = element.style
  style.setProperty('--color-brown-super-light', theme.superLight)
  style.setProperty('--color-brown-extra-light', theme.extraLight)
  style.setProperty('--color-brown-light', theme.light)
  style.setProperty('--color-brown-lighter', theme.lighter)
  style.setProperty('--color-brown-medium', theme.medium)
  style.setProperty('--color-brown-medium-light', theme.mediumLight)
  style.setProperty('--color-brown-dark', theme.dark)
}
