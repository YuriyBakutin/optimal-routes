import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import styleImport from 'vite-plugin-style-import'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    // https://github.com/anncwb/vite-plugin-style-import
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          // esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3)
            return path.resolve(__dirname, `element-plus/packages/theme-chalk/src/${name}.css`)
          },
          resolveComponent: (name) => {
            return path.resolve(__dirname, `element-plus/lib/${name}`)
          }
        }
      ]
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [
        // auto import icons
        // https://github.com/antfu/vite-plugin-icons
        IconsResolver({
          componentPrefix: 'i',
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/vite-plugin-icons
    Icons({
      autoInstall: true,
    }),

    // https://github.com/antfu/unocss
    Unocss({
      shortcuts: [
        ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
        ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
      ],
      presets: [
        presetUno(),
        presetAttributify(),
      ],
      rules: [
        ['j-center', { 'justify-content': 'center' }],
        ['a-center', { 'align-items': 'center' }],
        ['a-end', { 'align-items': 'flex-end' }],
        ['a-start', { 'align-items': 'flex-start' }],
        ['between', { 'justify-content': 'space-between' }],
        ['fit', { width: '100%' }],
      ],
    }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
})
