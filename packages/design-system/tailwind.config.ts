import type { Config } from 'tailwindcss'
import { colors } from './src/tokens/colors'

const config: Config = {
  content: ["./src/**/*.tsx",],
  theme: {
    colors: colors,
    extend: {
      gridTemplateColumns: {
        app: 'minmax(18rem, 20rem) 1fr',
      }
    },
  },
  plugins: [],
}
export default config
