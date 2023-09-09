import React from 'react'
import Box from '@mui/material/Box'
import useGlobalSetting from '@/hooks/useGlobalSetting'

function TopLeft() {
  const { lang } = useGlobalSetting()

  return (
    <Box className="leaflet-top leaflet-left">
      <Box className="leaflet-control">
        <div>
          Debug: <br />
          {'Language: ' + lang}
        </div>
      </Box>
    </Box>
  )
}

export default TopLeft
