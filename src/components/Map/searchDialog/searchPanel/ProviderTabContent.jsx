import React from 'react'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import ListItemText from '@mui/material/ListItemText'
import blue from '@mui/material/colors/blue'

function ProviderTabContent({ list }) {
  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
        // bgcolor: 'grey.50',
      }}
    >
      {list &&
        list.map((l, index) => (
          <ListItem key={index} component='div' disablePadding>
            <ListItemButton
              sx={{
                py: 2,
                borderBottom: 1,
                borderColor: 'divider',
                borderColor: 'transparent',
                '&:hover': {
                  bgcolor: blue[50],
                },
              }}
            >
              <ListItemIcon>
                <TextSnippetIcon />
              </ListItemIcon>
              <ListItemText
                primary={l['zh_hk']}
                primaryTypographyProps={{
                  sx: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                  title: l['zh_hk'],
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
    </Box>
  )
}

export default ProviderTabContent
