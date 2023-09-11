import { redirect } from 'next/navigation'
import { defaultLocale } from '@/resources'

function RootPage() {
  redirect(`/${defaultLocale}`)
}

export default RootPage
