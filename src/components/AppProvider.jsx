'use client'

import {
  GlobalSettingContextProvider,
  useDefaultSetting,
} from '@/hooks/useGlobalSetting'

function AppProvider({ children }) {
  const defaultSetting = useDefaultSetting()

  return (
    <GlobalSettingContextProvider value={defaultSetting}>
      {children}
    </GlobalSettingContextProvider>
  )
}

export default AppProvider
