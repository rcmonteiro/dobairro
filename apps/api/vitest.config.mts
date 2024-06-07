import swc from 'unplugin-swc'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.spec.ts'],
    globals: true,
    root: './',
    setupFiles: ['dotenv/config', './src/tests/setup-e2e.ts'],
    dir: 'src',
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
