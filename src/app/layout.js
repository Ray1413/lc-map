import * as React from 'react'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'

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
      <body style={{ background: 'lightsteelblue' }}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
