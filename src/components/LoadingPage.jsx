'use client'
import { Box, Fade } from '@mui/material'
import useGlobalSetting from '@/hooks/useGlobalSetting'
import GlassmorphismCard from './GlassmorphismCard'

function LoadingPage() {
  const { mapLoaded } = useGlobalSetting()

  return (
    <Fade in={!mapLoaded} appear={false} timeout={1200}>
      <Box
        sx={{
          zIndex: 9999,
          position: 'fixed',
          width: '100%',
          height: '100%',
          // background: (theme) => theme.palette.background.paper,
          background: '#4a81de center no-repeat url("/img/world_map.png")',
        }}
      >
        <GlassmorphismCard
          square
          sx={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <Box
              sx={{
                fontSize: '50px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                // background: 'linear-gradient(90deg,#eeac43,#f15874)',
                background: 'linear-gradient(90deg,#cee610,#f15874)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              LC Map
            </Box>
          </Box>
          <Box
            sx={{
              width: '80%',
              maxWidth: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src="/img/Spinner-1s-300px.gif" width="100px" />
          </Box>
        </GlassmorphismCard>
      </Box>
    </Fade>
  )
}

export default LoadingPage
