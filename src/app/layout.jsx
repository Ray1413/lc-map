import * as React from 'react'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import AppProvider from '@/components/AppProvider'
import Box from '@mui/material/Box'
import Map from '@/components/Map'

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
      </head>
      <body style={{ background: 'lightyellow' }}>
        <AppProvider>
          <ThemeRegistry>
            <Box>
              <Map />
            </Box>
            {children}
          </ThemeRegistry>
        </AppProvider>
      </body>
    </html>
  )
}
