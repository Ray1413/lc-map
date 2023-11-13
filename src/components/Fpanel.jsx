'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { Box, Paper, Collapse, useTheme } from '@mui/material'
import SearchPanel from './Map/searchDialog/searchPanel/SearchPanel'
import useGlobalSetting from '@/hooks/useGlobalSetting'

// Floating panel
function Fpanel() {
  // const ref = useRef(null)
  const panelWidth = 380
  const margin = 0
  const [showSearchPanel, setShowSearchPanel] = useState(false)
  const { openFpanel, setOpenFpanel } = useGlobalSetting()
  const theme = useTheme()

  useEffect(() => {
    setShowSearchPanel(true)
    setTimeout(() => {
      if (window.innerWidth >= theme.breakpoints.values.sm) {
        setOpenFpanel(true)
      }
    }, 1500)
  }, [])

  return (
    <Collapse
      orientation="horizontal"
      in={openFpanel}
      collapsedSize={55}
      sx={{
        position: 'fixed',
        top: margin,
        left: margin,
        // width: panelWidth,
        // height: `calc(100vh - ${margin * 2}px)`,
        zIndex: 1300,
      }}
    >
      <Collapse orientation="vertical" in={openFpanel} collapsedSize={55}>
        <Box
          sx={{
            // position: 'fixed',
            // top: margin,
            // left: margin,
            width: {
              xs: '100vw',
              sm: panelWidth,
            },
            height: `calc(100vh - ${margin * 2}px)`,
            // zIndex: 1300,
          }}
        >
          <Paper
            sx={{
              height: '100%',
              backdropFilter: 'saturate(180%) blur(5px)',
              background: 'hsla(0,0%,100%,.8)',
            }}
          >
            {showSearchPanel ? <SearchPanel /> : null}
          </Paper>
        </Box>
      </Collapse>
    </Collapse>
  )
}

export default Fpanel
