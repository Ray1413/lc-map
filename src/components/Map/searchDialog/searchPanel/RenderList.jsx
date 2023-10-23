import React from 'react'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import ListItemText from '@mui/material/ListItemText'
import blue from '@mui/material/colors/blue'
import CategoryIcon from '@mui/icons-material/Category'
import Badge from '@mui/material/Badge'
import { useParams } from 'next/navigation'

function RenderList({
  list,
  icon,
  firstItem,
  hideFirstIcon,
  handleItemClick,
  checkItemSelected,
}) {
  let newList = list
  if (list && firstItem) {
    newList = [firstItem, ...list]
  }

  const { language } = useParams()

  const iconWithBadge = (count) => (
    <Badge badgeContent={count} color="primary" showZero>
      {icon}
    </Badge>
  )

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
        // bgcolor: 'grey.50',
      }}
    >
      {newList
        ? newList.map((l, index) => (
            <ListItem key={index} component="div" disablePadding>
              <ListItemButton
                onClick={(event) => handleItemClick(event, l)}
                selected={checkItemSelected(l)}
                sx={{
                  py: 2,
                  // borderBottom: 1,
                  // borderColor: 'divider',
                  // borderColor: 'transparent',
                  // '&:hover': {
                  //   bgcolor: blue[50],
                  // },
                  '&:hover, &.Mui-selected:hover, &.Mui-selected': {
                    bgcolor: blue[50],
                  },
                  '&.Mui-selected .MuiSvgIcon-root, &.Mui-selected .MuiTypography-root':
                    {
                      color: 'primary.main',
                    },
                }}
              >
                <ListItemIcon>
                  {/* <TextSnippetIcon /> */}
                  {index === 0 && hideFirstIcon ? null : iconWithBadge(l.count)}
                </ListItemIcon>
                <ListItemText
                  primary={l[language]}
                  primaryTypographyProps={{
                    sx: {
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                    title: l[language],
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))
        : null}
    </Box>
  )
}

export default RenderList
