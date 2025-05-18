import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: true,
    lib: {
      name: 'toast',
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: (format, chunk) => `${chunk}.${format}.js`,
      cssFileName: 'index'
    },
    rollupOptions: {
      external: ['vue', '@anfu/utils', '@anfu/use', '@anfu/overlay', '@anfu/modal'],
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
      },
    },
  },
})
