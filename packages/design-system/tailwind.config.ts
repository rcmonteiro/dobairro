import type { Config } from 'tailwindcss'
import { colors } from './src/tokens/colors'

const config: Config = {
  content: ["./src/**/*.tsx",],
  theme: {
    colors: colors,
  },
  plugins: [],
}
export default config
