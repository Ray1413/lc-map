import Box from '@mui/material/Box'
import { redirect } from 'next/navigation'
import Map from '@/components/Map'
import { defaultLocale, locales } from '@/resources'

export default function HomePage({ params: { lang } }) {
  const invalidLang = locales.every((locales) => locales !== lang)
  if (invalidLang) {
    redirect(`/${defaultLocale}`)
  }

  return (
    <Box>
      <Map />
    </Box>
  )
}
