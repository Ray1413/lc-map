import React from 'react'
import Box from '@mui/material/Box'
// import useGlobalSetting from '@/hooks/useGlobalSetting'
// import { useParams } from 'next/navigation'

function TopLeft() {
  // const { resource } = useGlobalSetting()
  // const { selectedCategory } = useGlobalSetting()
  // const { language } = useParams()
  // console.log('TopLeft')

  return (
    <Box className="leaflet-top leaflet-left">
      <Box className="leaflet-control">
        {/* <div>
          <div>Debug: </div>
          <div>{'Language: ' + language}</div>
          <div>{'selectedCategory: ' + selectedCategory[language]}</div>
        </div> */}
      </Box>
    </Box>
  )
}

export default TopLeft
