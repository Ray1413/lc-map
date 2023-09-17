'use client'
import { notFound } from 'next/navigation'
import { locales, getResource } from '@/resources'
import useGlobalSetting from '@/hooks/useGlobalSetting'
import { useEffect } from 'react'

export async function generateStaticParams() {
  return locales.map((locale) => ({ language: locale }))
}

export default function Layout({ children, params: { language } }) {
  // console.log('Layout ')
  const invalidLang = locales.every((locales) => locales !== language)
  if (invalidLang) {
    // redirect(`/${defaultLocale}`)
    notFound()
  }
  const { setResource } = useGlobalSetting()

  useEffect(() => {
    ;(async () => {
      const resource = await getResource(language)
      setResource(resource)
    })()
  }, [])

  return <>{children}</>
}
