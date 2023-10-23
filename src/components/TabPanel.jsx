import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import Paper from '@mui/material/Paper'

function TabPanel(props) {
  const { children, value, index, sx, containerRef, ...other } = props
  // console.log(`TabPanel-${index}`)

  return (
    <Slide
      direction="down"
      in={value === index}
      // mountOnEnter
      // timeout={500}
      container={containerRef.current}
    >
      <Paper
        elevation={1}
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        sx={{
          ...sx,
          // display: value === index ? '' : 'none',
          width: '100%',
          height: '100%',
          // overflow: 'auto',
          position: 'absolute',
          top: 0,
          bgcolor: 'background.paper',
        }}
        {...other}
        // style={{
        //   display: value === index ? '' : 'none',
        // }}
      >
        {/* {value === index && children} */}

        {children}
      </Paper>
    </Slide>
  )
}

export default TabPanel
