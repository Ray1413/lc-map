import { useTheme, useMediaQuery, IconButton } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import SearchPanel from './searchPanel'
import useGlobalSetting from '../../../hooks/useGlobalSetting'

function index() {
  const theme = useTheme()
  const { searchPanelLoaded, isSearchPanelOpen, setIsSearchPanelOpen } =
    useGlobalSetting()

  return (
    <Dialog
      keepMounted
      sx={{
        '& .MuiDialog-paper': {
          height: '100vh',
        },
      }}
      maxWidth="lg"
      fullWidth={true}
      fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
      scroll="paper"
      open={isSearchPanelOpen}
    >
      <DialogContent
        dividers
        sx={{
          // p: (theme) => ({
          //   xs: theme.spacing(1),
          //   sm: theme.spacing(2),
          // }),
          p: 0,
          border: 0,
        }}
      >
        {searchPanelLoaded ? <SearchPanel /> : null}
      </DialogContent>
    </Dialog>
  )
}

export default index
