import { Paper } from '@mui/material'

function GlassmorphismCard({ sx, ...rest }) {
  return (
    <Paper
      {...rest}
      sx={{
        backdropFilter: 'saturate(180%) blur(5px)',
        background: 'hsla(0,0%,100%,.8)',
        ...sx,
      }}
    />
  )
}

export default GlassmorphismCard
