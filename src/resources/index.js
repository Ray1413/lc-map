export const i18n = [
  {
    locale: 'zh',
    displayName: '中文',
  },
  {
    locale: 'en',
    displayName: 'English',
  },
]

export const defaultLocale = i18n[0].locale

// export const resources = {
//   en: () => import('@/resources/en.json').then((module) => module.default),
//   zh: () => import('@/resources/zh.json').then((module) => module.default),
// }
export const resources = i18n.reduce((result, item) => {
  return {
    ...result,
    [item.locale]: () =>
      import(`@/resources/${item.locale}.json`).then(
        (module) => module.default
      ),
  }
}, {})

// export const locales = Object.keys(resources)
export const locales = i18n.map((item) => item.locale)

export const getResource = async (locale) =>
  resources[locale]?.() ?? resources[defaultLocale]()
