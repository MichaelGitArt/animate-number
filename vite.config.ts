import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true,

    lib: {
      entry: path.resolve(__dirname, './src/lib/index.ts'),
      name: 'animate-number',
      fileName: (format) => {
        let fileEnd = 'js'

        if (format === 'es')
          fileEnd = 'mjs'

        else if (format === 'umd')
          fileEnd = 'cjs'

        return `index.${fileEnd}`
      },
    },
  },

  test: {
    environment: 'happy-dom',
  },
})
