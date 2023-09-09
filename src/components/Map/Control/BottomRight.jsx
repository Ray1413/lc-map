import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import { useMap } from 'react-leaflet'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import TranslateIcon from '@mui/icons-material/Translate'
import SearchIcon from '@mui/icons-material/Search'
import ListIcon from '@mui/icons-material/List'
import Badge from '@mui/material/Badge'
import CircularProgress from '@mui/material/CircularProgress'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { blue } from '@mui/material/colors'
import useGlobalSetting from '@/hooks/useGlobalSetting'

const selectedBtnStyle = {
  '&:hover': {
    backgroundColor: blue[50],
  },
  backgroundColor: blue[50],
}

function BottomRight() {
  const map = useMap()
  const [zoomInBtnDisable, setZoomInBtnDisable] = useState(false)
  const [zoomOutBtnDisable, setZoomOutBtnDisable] = useState(false)

  const zoomIn = () => map.zoomIn()
  const zoomOut = () => map.zoomOut()
  const onZoomEnd = () => {
    const zoom = map.getZoom()
    const minZoom = map.getMinZoom()
    const maxZoom = map.getMaxZoom()
    setZoomInBtnDisable(zoom === maxZoom)
    setZoomOutBtnDisable(zoom === minZoom)
  }

  const {
    lang,
    setLang,
    setSearchPanelLoaded,
    setIsSearchPanelOpen,
    fetchingDataset,
    geojsonData,
  } = useGlobalSetting()

  useEffect(() => {
    map.on('zoomend', onZoomEnd)
    return () => map.off('zoomend', onZoomEnd)
  }, [])

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleLangChange = (lang) => {
    setLang(lang)
    setOpen(false)
  }

  const showListBtn = (geojsonData?.features?.length ?? 0) > 0

  return (
    <Box className="leaflet-bottom leaflet-right">
      <Box
        className="leaflet-control"
        style={{
          marginBottom: 30,
          display: 'flex',
          flexDirection: 'column',
        }}
        sx={{
          '& > .MuiFab-root, & > .MuiBox-root ': {
            marginTop: 1,
          },
          '& .MuiFab-root ': {
            boxShadow: 1,
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Fab
            color="whiteBtn"
            aria-label="list"
            size="small"
            disableFocusRipple={true}
            disableRipple={false}
            sx={{
              opacity: showListBtn ? 1 : 0,
              pointerEvents: showListBtn ? 'auto' : 'none',
            }}
          >
            <Badge
              badgeContent={
                geojsonData?.features ? geojsonData.features.length : 0
              }
              color="error"
              // overlap='circular'
              sx={{
                '& > .MuiBadge-badge': {
                  fontSize: '0.6rem',
                  zIndex: 1051,
                },
              }}
              max={999}
            >
              <ListIcon />
            </Badge>
          </Fab>
          {fetchingDataset && (
            <CircularProgress
              disableShrink
              // size={44} /* 40 + 2 + 2 */
              size={40}
              sx={{
                position: 'absolute',
                // top: -2,
                // left: -2,
                top: 0,
                left: 0,
                zIndex: 1052,
                animationDuration: '800ms',
              }}
            />
          )}
        </Box>

        <Fab
          color="whiteBtn"
          aria-label="add"
          disabled={zoomInBtnDisable}
          size="small"
          disableFocusRipple={true}
          disableRipple={false}
          onClick={zoomIn}
        >
          <AddIcon />
        </Fab>

        <Fab
          color="whiteBtn"
          aria-label="remove"
          disabled={zoomOutBtnDisable}
          size="small"
          disableFocusRipple={true}
          disableRipple={false}
          onClick={zoomOut}
        >
          <RemoveIcon />
        </Fab>

        <Fab
          color="whiteBtn"
          aria-label="translate"
          size="small"
          disableFocusRipple={true}
          disableRipple={false}
          onClick={() => {
            setIsSearchPanelOpen(true)
            setSearchPanelLoaded(true)
          }}
          sx={{
            boxShadow: 1,
          }}
        >
          <SearchIcon />
        </Fab>

        <Fab
          color="whiteBtn"
          aria-label="translate"
          size="small"
          disableFocusRipple={true}
          disableRipple={false}
          onClick={handleClickOpen}
          sx={{
            boxShadow: 1,
          }}
        >
          <TranslateIcon />
        </Fab>
      </Box>

      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>Language</DialogTitle>
        <DialogContent dividers>
          <Stack sx={{ '& > button': { marginBottom: 0.5 } }}>
            <Button
              size="large"
              sx={lang == 'tc' ? selectedBtnStyle : null}
              onClick={() => handleLangChange('tc')}
            >
              中
            </Button>
            <Button
              size="large"
              sx={lang == 'en' ? selectedBtnStyle : null}
              onClick={() => handleLangChange('en')}
            >
              English
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BottomRight
