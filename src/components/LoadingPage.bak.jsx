'use client'
import { useState, useEffect } from 'react'
import { Box, LinearProgress, Typography, Fade } from '@mui/material'
import useGlobalSetting from '@/hooks/useGlobalSetting'

function LoadingPage() {
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showLoading, setShowLoading] = useState(true)
  const threshold = 90
  const maxProgress = 99
  const { mapLoaded } = useGlobalSetting()
  let timerId

  useEffect(() => {
    setMounted(true)

    if (mapLoaded) {
      setProgress(100)
      setTimeout(() => setShowLoading(false), 300)
    } else {
      timerId = setInterval(() => {
        setProgress((preVal) => {
          const newVal = preVal + (preVal >= threshold ? 0.1 : 1)
          if (newVal >= maxProgress) {
            clearInterval(timerId)
          }
          return newVal
        })
      }, 100)
    }

    return () => {
      clearInterval(timerId)
    }
  }, [mapLoaded])

  return (
    <Fade in={showLoading} appear={false} timeout={1200}>
      <Box
        sx={{
          zIndex: 9999,
          position: 'fixed',
          width: '100%',
          height: '100%',
          background: (theme) => theme.palette.background.paper,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography color="primary" variant="h3" gutterBottom>
            LC Map
          </Typography>
        </Box>
        <Box
          sx={{
            // width: { xs: '80%', sm: '50%' },
            width: '80%',
            maxWidth: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              color="primary"
              variant={'indeterminate'}
              // variant={mounted ? 'determinate' : 'indeterminate'}
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
                transition: 'none',
              }}
            />
          </Box>
          {mounted ? (
            <Box sx={{ minWidth: 40, textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">
                {`${Math.floor(progress)}%`}
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Fade>
  )
}

export default LoadingPage
