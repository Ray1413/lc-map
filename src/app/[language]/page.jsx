import { locales } from '@/resources'

export async function generateStaticParams() {
  return locales.map((locale) => ({ language: locale }))
}

export default function HomePage() {
  return <></>
}
