import { useEffect, useState, memo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
// import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import PlaceIcon from '@mui/icons-material/Place'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ListItemText from '@mui/material/ListItemText'
import { FixedSizeList, areEqual } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import blue from '@mui/material/colors/blue'
import useGlobalSetting from '../../../../hooks/useGlobalSetting'
import highlightText from '../../../../utils/highlightText'
import { useParams } from 'next/navigation'
import { useTheme } from '@mui/material'

const TitleWithIndex = ({ indexStr, children }) => (
  <span>
    {indexStr}
    {children}
  </span>
)

const RenderRow = memo((props) => {
  const { data: dataset, index, style } = props
  const theme = useTheme()

  const { language } = useParams()

  const indexStr = `${index + 1}. `

  const {
    selectedDatasetId,
    handleDatasetItemClick,
    searchText,
    setIsSearchPanelOpen,
    setSelectedFacility,
    setOpenFpanel,
  } = useGlobalSetting()
  const resources = dataset[index]['resources']
  // const selected = dataset[index]['title'][0] === selectedDatasetId
  const selected = resources[language]['title'][0] === selectedDatasetId

  // const titleHighlighted =
  //   dataset[index]['titleHighlighted'] || dataset[index]['title']

  // const titleHighlighted = searchText
  //   ? dataset[index]['title'].map((t) => highlightText(searchText, t))
  //   : dataset[index]['title']

  const title_en = resources['en']['title'] + '<br/>' + resources['zh']['title']
  const title_zh = resources['zh']['title'] + '<br/>' + resources['en']['title']

  const titleHighlighted_en =
    highlightText(searchText, resources['en']['title']) +
    '<br/>' +
    highlightText(searchText, resources['zh']['title'])
  const titleHighlighted_zh =
    highlightText(searchText, resources['zh']['title']) +
    '<br/>' +
    highlightText(searchText, resources['en']['title'])

  const titleHighlighted = {
    en: <span dangerouslySetInnerHTML={{ __html: titleHighlighted_en }} />,
    zh: <span dangerouslySetInnerHTML={{ __html: titleHighlighted_zh }} />,
  }

  const fac_en =
    resources['en']['facilities'] + '<br/>' + resources['zh']['facilities']
  const fac_zh =
    resources['zh']['facilities'] + '<br/>' + resources['en']['facilities']

  const facHighlighted_en =
    highlightText(searchText, resources['en']['facilities']) +
    '<br/>' +
    highlightText(searchText, resources['zh']['facilities'])
  const facHighlighted_zh =
    highlightText(searchText, resources['zh']['facilities']) +
    '<br/>' +
    highlightText(searchText, resources['en']['facilities'])
  const facHighlighted = {
    en: <span dangerouslySetInnerHTML={{ __html: facHighlighted_en }} />,
    zh: <span dangerouslySetInnerHTML={{ __html: facHighlighted_zh }} />,
  }

  const lineBreak = `
`

  return (
    <ListItem
      style={style}
      key={dataset[index]['resources']['en']['title']}
      component="div"
      disablePadding
    >
      <ListItemButton
        sx={{
          // borderBottom: 1,
          // borderColor: 'divider',
          // borderColor: 'transparent',

          '&:hover, &.Mui-selected:hover, &.Mui-selected': {
            bgcolor: blue[50],
          },
          '&.Mui-selected .MuiTypography-root': {
            color: 'primary.main',
          },
        }}
        selected={selected}
        // onClick={(event) =>
        //   handleDatasetItemClick(
        //     event,
        //     dataset[index]['title'][0],
        //     dataset[index]['geojsonURL']
        //   )
        // }
        onClick={() => {
          // setIsSearchPanelOpen(false)
          // setSelectedFacility(dataset[index])
          if (window.innerWidth < theme.breakpoints.values.sm) {
            setOpenFpanel(false)
          }
          setSelectedFacility({ ...dataset[index] })
          // console.log(dataset[index])
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 42,
          }}
        >
          {selected ? <HighlightOffIcon color="error" /> : <PlaceIcon />}
        </ListItemIcon>
        <ListItemText
          primary={
            <TitleWithIndex indexStr={indexStr}>
              {/* {titleHighlighted[language == 'en' ? 0 : 1]} */}
              {titleHighlighted[language]}
            </TitleWithIndex>
          }
          secondary={facHighlighted[language]}
          primaryTypographyProps={{
            sx: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            title:
              indexStr +
              (language == 'en'
                ? title_en.replaceAll('<br/>', lineBreak)
                : title_zh.replaceAll('<br/>', lineBreak)),
          }}
          secondaryTypographyProps={{
            sx: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            title:
              language == 'en'
                ? fac_en.replaceAll('<br/>', lineBreak)
                : fac_zh.replaceAll('<br/>', lineBreak),
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}, areEqual)

function DatasetList({ dataset = [] }) {
  // console.log('DatasetList')

  return (
    <>
      <Box
        sx={{
          height: '100%',
          // bgcolor: 'grey.50'
        }}
      >
        {/* <Stack direction='row' justifyContent='end'>
          <Typography
            sx={{
              color: 'primary.main',
            }}
            component={'span'}
            // variant='subtitle2'
            // gutterBottom
          >{`${dataset.length}`}</Typography>
          <Typography component={'span'}>{` datasets`}</Typography>
        </Stack> */}

        {dataset.length > 0 ? (
          <AutoSizer>
            {({ height, width }) => (
              // Use these actual sizes to calculate your percentage based sizes
              <FixedSizeList
                height={height}
                width={width}
                itemSize={116}
                itemCount={dataset.length}
                overscanCount={5}
                itemData={dataset}
              >
                {RenderRow}
              </FixedSizeList>
            )}
          </AutoSizer>
        ) : null}
      </Box>
    </>
  )
}

export default DatasetList
