import * as React from 'react'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import AppProvider from '@/components/AppProvider'
import Box from '@mui/material/Box'
import Map from '@/components/Map'
import Fpanel from '@/components/Fpanel'
import LoadingPage from '@/components/LoadingPage'

export const metadata = {
  title: 'LC Map',
  description: 'LC Map',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="./css/leaflet.css"></link>
        <link rel="stylesheet" href="./css/maplibre-gl.css"></link>
        <link rel="stylesheet" href="./css/MarkerCluster.css"></link>
        <link rel="stylesheet" href="./css/MarkerCluster.Default.css"></link>
        <link rel="stylesheet" href="./css/MarkerCluster.Custom.css"></link>
      </head>
      <body>
        <AppProvider>
          <ThemeRegistry>
            <Box>
              <LoadingPage />
              <Map />
              <Fpanel />
            </Box>
            {children}
          </ThemeRegistry>
        </AppProvider>
      </body>
    </html>
  )
}
