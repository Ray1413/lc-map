import React from 'react'
import { useMap } from 'react-leaflet'
import Box from '@mui/material/Box'
import TopLeft from './TopLeft'
import TopRight from './TopRight'
import BottomLeft from './BottomLeft'
import BottomRight from './BottomRight'

function Control() {
  const map = useMap()
  console.log('Control')
  map.zoomControl.remove()

  return (
    <Box
      className="my-control-container"
      onDoubleClickCapture={(e) => {
        e.stopPropagation()
      }}
    >
      <TopLeft />
      <TopRight />
      <BottomLeft />
      <BottomRight />
    </Box>
  )
}

export default Control
