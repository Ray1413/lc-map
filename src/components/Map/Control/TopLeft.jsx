import React from 'react'
import Box from '@mui/material/Box'
import useGlobalSetting from '@/hooks/useGlobalSetting'

function TopLeft() {
  const { lang, getResource } = useGlobalSetting()
  // console.log(getResource)
  // const resource = getResource()
  // console.log(resource)

  return (
    <Box className="leaflet-top leaflet-left">
      <Box className="leaflet-control">
        <div>
          <div>Debug: </div>
          <div>{'Language: ' + lang}</div>
        </div>
      </Box>
    </Box>
  )
}

export default TopLeft
