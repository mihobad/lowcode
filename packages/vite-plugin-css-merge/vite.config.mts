import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: true,
    lib: {
      name: 'vite-plugin-css-merge',
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: (format, chunk) => `${chunk}.${format}.js`,
    },
    rollupOptions: {
      external: [
   
      ],
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        dir: 'dist',
        exports: 'default',
      },
    },
  },
})
