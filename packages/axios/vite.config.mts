import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    minify: true,
    lib: {
      name: 'axios',
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: (format, chunk) => `${chunk}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'axios', '@anfu/toast'],
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
