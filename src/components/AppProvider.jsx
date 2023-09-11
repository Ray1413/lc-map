'use client'

import {
  GlobalSettingContextProvider,
  useDefaultSetting,
} from '@/hooks/useGlobalSetting'

function AppProvider({ children, lang }) {
  const defaultSetting = useDefaultSetting(lang)

  return (
    <GlobalSettingContextProvider value={defaultSetting}>
      {children}
    </GlobalSettingContextProvider>
  )
}

export default AppProvider
