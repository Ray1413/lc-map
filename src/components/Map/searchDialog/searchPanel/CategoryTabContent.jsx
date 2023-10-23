import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '../../../TabPanel'
import a11yProps from './a11yProps'

import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import ListItemText from '@mui/material/ListItemText'
import blue from '@mui/material/colors/blue'

// import dataset from './dataset_filtered.json'

function CategoryTabContent({ list }) {
  // const [value, setValue] = useState(0)
  // console.log('CategoryTabContentMemo')
  // const handleChange = (event, newValue) => {
  //   setValue(newValue)
  // }

  return (
    <>
      {/* <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <Tabs
          orientation='vertical'
          // variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Category' {...a11yProps(0)} />
          <Tab label='Provider' {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Box sx={{ p: 3, pt: 0 }}>
            {dataset.filter.category.map((x) => (
              <div style={{ padding: '12px 16px' }} key={x.en}>
                {x.zh_hk}
              </div>
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ p: 3, pt: 0 }}>
            {dataset.filter.provider.map((x) => (
              <div style={{ padding: '12px 16px' }} key={x.en}>
                {x.zh_hk}
              </div>
            ))}
          </Box>
        </TabPanel>
      </Box> */}

      <Box
        sx={{
          height: '100%',
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
    </>
  )
}

export default CategoryTabContent
