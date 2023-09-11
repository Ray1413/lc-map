import * as React from 'react'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import AppProvider from '@/components/AppProvider'
import { locales } from '@/resources'

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

export default function Layout({ children, params: { lang } }) {
  return (
    <AppProvider lang={lang}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </AppProvider>
  )
}
