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

const TitleWithIndex = ({ indexStr, children }) => (
  <span>
    {indexStr}
    {children}
  </span>
)

const RenderRow = memo((props) => {
  const { data: dataset, index, style } = props

  const { language } = useParams()

  const indexStr = `${index + 1}. `

  const { selectedDatasetId, handleDatasetItemClick, searchText } =
    useGlobalSetting()

  const selected = dataset[index]['title'][0] === selectedDatasetId

  // const titleHighlighted =
  //   dataset[index]['titleHighlighted'] || dataset[index]['title']

  const titleHighlighted = searchText
    ? dataset[index]['title'].map((t) => highlightText(searchText, t))
    : dataset[index]['title']

  // const cateHighlighted = searchText
  //   ? dataset[index]['category'].map((t) => highlightText(searchText, t))
  //   : dataset[index]['category']

  return (
    <ListItem
      style={style}
      key={dataset[index]['title'][0]}
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
        onClick={() => console.log(dataset[index])}
      >
        <ListItemIcon>
          {selected ? <HighlightOffIcon color="error" /> : <PlaceIcon />}
        </ListItemIcon>
        <ListItemText
          primary={
            <TitleWithIndex indexStr={indexStr}>
              {titleHighlighted[language == 'en' ? 0 : 1]}
            </TitleWithIndex>
          }
          secondary={titleHighlighted[language == 'en' ? 1 : 0]}
          primaryTypographyProps={{
            sx: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            title: indexStr + dataset[index]['title'][language == 'en' ? 0 : 1],
          }}
          secondaryTypographyProps={{
            sx: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            title: dataset[index]['category'][language == 'en' ? 0 : 1],
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
                itemSize={73}
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
