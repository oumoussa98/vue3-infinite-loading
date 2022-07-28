import { defineConfigWithTheme } from 'vitepress'
import baseConfig from '@vue/theme/config'
import type { Config } from '@vue/theme'
import { UserConfig } from 'vitepress'

const nav = [
  {
    text: 'Docs',
    activeMatch: `^/(guide)/`,
    link: '/guide/introduction'
  }
]

export const sidebar = {
  '/guide/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: '/guide/introduction' },
        { text: 'Installation', link: '/guide/installation' },
        {
          text: 'Quick Demo',
          link: '/guide/quick-demo'
        }
      ]
    },
    {
      text: 'API',
      items: [
        {
          text: 'Props',
          link: '/guide/api/props'
        },
        {
          text: 'Events',
          link: '/guide/api/events'
        },
        {
          text: 'Slots',
          link: '/guide/api/slots'
        }
      ]
    }
  ]
}

export default defineConfigWithTheme<Config>({
  extends: baseConfig as () => UserConfig<Config>,

  lang: 'en-US',
  title: 'infinite scroll',
  description:
    'An infinite scroll component compatible with vue.js 3 and vite',
  srcDir: 'src',
  scrollOffset: 'header',

  head: [
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,

    // algolia: {
    //   indexName: 'vue3-infinite-loading',
    //   appId: 'N3R7MCD7RV',
    //   apiKey: '733b2c5858d500a03e8bb1dd346b6647',
    //   searchParameters: {
    //     facetFilters: ['version:v3']
    //   }
    // },

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/oumoussa98/vue3-infinite-loading'
      }
    ],

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      }
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunks/[name].[hash].js',
          manualChunks(id, ctx) {
            return moveToVendor(id, ctx)
          }
        }
      }
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
})

const cache = new Map<string, boolean>()

/**
 * This is temporarily copied from Vite - which should be exported in a
 * future release.
 *
 * @TODO when this is exported by Vite, VitePress should ship a better
 * manual chunk strategy to split chunks for deps that are imported by
 * multiple pages but not all.
 */
function moveToVendor(id: string, { getModuleInfo }: any) {
  if (
    id.includes('node_modules') &&
    !/\.css($|\\?)/.test(id) &&
    staticImportedByEntry(id, getModuleInfo, cache)
  ) {
    return 'vendor'
  }
}

function staticImportedByEntry(
  id: string,
  getModuleInfo: any,
  cache: Map<string, boolean>,
  importStack: string[] = []
): boolean {
  if (cache.has(id)) {
    return cache.get(id) as boolean
  }
  if (importStack.includes(id)) {
    // circular deps!
    cache.set(id, false)
    return false
  }
  const mod = getModuleInfo(id)
  if (!mod) {
    cache.set(id, false)
    return false
  }

  if (mod.isEntry) {
    cache.set(id, true)
    return true
  }
  const someImporterIs = mod.importers.some((importer: string) =>
    staticImportedByEntry(
      importer,
      getModuleInfo,
      cache,
      importStack.concat(id)
    )
  )
  cache.set(id, someImporterIs)
  return someImporterIs
}
