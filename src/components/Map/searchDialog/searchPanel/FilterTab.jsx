import { useEffect, useState, useRef, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '../../../TabPanel'
import Stack from '@mui/material/Stack'
import Popover from '@mui/material/Popover'

import a11yProps from './a11yProps'
// import dataset from './dataset_filtered.json'

import CategoryTabContent from './CategoryTabContent'
import ProviderTabContent from './ProviderTabContent'
import RenderList from './RenderList'
import TuneIcon from '@mui/icons-material/Tune'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import CategoryIcon from '@mui/icons-material/Category'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import Badge from '@mui/material/Badge'

import DatasetList from './DatasetList'
import { escapeRegExp } from '../../../../utils/highlightText'
import useGlobalSetting from '../../../../hooks/useGlobalSetting'
import { useParams } from 'next/navigation'
// import { resources } from '@/resources'
import useFilteredDataset from '@/hooks/useFilteredDataset'

// const CategoryTabContentMemo = memo(CategoryTabContent)

function SpanWithTitle({ children }) {
  return <span title={children}>{children}</span>
}

function FilterTab({ searchText }) {
  const { language } = useParams()

  // console.log('FilterTab')
  const [value, setValue] = useState(false)
  // const popoverAnchor = useRef(null)

  const tabPanelContainer = useRef(null)

  // const [datasetInfo, setDatasetInfo] = useState({})

  const {
    resource,
    datasetInfo,
    setDatasetInfo,
    selectedCategory,
    selectedProvider,
    setSelectedCategory,
    setSelectedProvider,
  } = useGlobalSetting()

  const cateIconWithBadge = useMemo(() => {
    let count = 0
    if (selectedCategory.en) {
      count = 1 // show badge
    }
    // try {
    //   count = datasetInfo.filter.category.find(
    //     (item) => item.en == selectedCategory
    //   ).count
    // } catch (err) {}

    return (
      <Badge
        component="div"
        badgeContent={count}
        color="primary"
        variant="dot"
        // sx={{
        //   '& > .MuiBadge-badge': {
        //     fontSize: '0.5rem',
        //     padding: '0 5px',
        //     height: 16,
        //     top: 3,
        //   },
        // }}
      >
        <CategoryIcon />
      </Badge>
    )
  }, [datasetInfo, selectedCategory])

  // const provIconWithBadge = useMemo(() => {
  //   let count = 0
  //   if (selectedProvider) {
  //     count = 1 // show badge
  //   }
  //   // try {
  //   //   count = datasetInfo.filter.provider.find(
  //   //     (item) => item.en == selectedProvider
  //   //   ).count
  //   // } catch (err) {}

  //   return (
  //     <Badge
  //       component="div"
  //       badgeContent={count}
  //       color="primary"
  //       variant="dot"
  //       // sx={{
  //       //   '& > .MuiBadge-badge': {
  //       //     fontSize: '0.5rem',
  //       //     padding: '0 5px',
  //       //     height: 16,
  //       //     top: 3,
  //       //   },
  //       // }}
  //     >
  //       <AccountBalanceIcon />
  //     </Badge>
  //   )
  // }, [datasetInfo, selectedProvider])

  const tabList = [
    {
      defaultTitle: 'Category',
      selectedTitle: selectedCategory[language],
      icon: cateIconWithBadge,
    },
    // {
    //   defaultTitle: 'Provider',
    //   selectedTitle: selectedProvider,
    //   icon: provIconWithBadge,
    // },
  ]

  // let dataset = useMemo(() => {
  //   const keyword = escapeRegExp(searchText)
  //   let dataset = datasetInfo.dataset || []
  //   // .slice(0, 10)

  //   if (selectedCategory.en) {
  //     // dataset = dataset.filter((d) => d.category[0] == selectedCategory)
  //     dataset = dataset.filter((d) => d.category.includes(selectedCategory.en))
  //   }
  //   if (selectedProvider) {
  //     // dataset = dataset.filter((d) => d.provider[0] == selectedProvider)
  //     dataset = dataset.filter((d) => d.provider.includes(selectedProvider))
  //   }

  //   dataset = dataset.filter(
  //     (d) => d.title.filter((t) => new RegExp(keyword, 'ig').test(t)).length > 0
  //     // ||
  //     // d.category.filter((t) => new RegExp(keyword, 'ig').test(t)).length > 0
  //   )

  //   // remove duplicates
  //   dataset = dataset.filter(
  //     (d, index) => index == dataset.findIndex((a) => a.title[0] == d.title[0])
  //   )

  //   return dataset
  // }, [datasetInfo, searchText, selectedCategory, selectedProvider])
  const dataset = useFilteredDataset()

  // const keyword = escapeRegExp(searchText)
  // let dataset = (datasetInfo.dataset || [])
  //   .slice(0, 10)
  //   .filter(
  //     (d) => d.title.filter((t) => new RegExp(keyword, 'ig').test(t)).length > 0
  //   )
  // if (keyword) {
  //   dataset = dataset.map((d) => ({
  //     ...d,
  //     titleHighlighted: d.title.map((t) => highlightText(keyword, t)),
  //   }))
  // }

  useEffect(() => {
    fetch('./facility.json')
      .then((res) => res.json())
      .then((data) => {
        // data.filter.provider = data.filter.provider.map((item) => {
        //   const count = data.dataset.filter((d) =>
        //     d.provider.includes(item.en)
        //   ).length

        //   return {
        //     ...item,
        //     count,
        //   }
        // })

        // data.filter.category = data.filter.category.map((item) => {
        //   const count = data.dataset.filter((d) =>
        //     d.category.includes(item.en)
        //   ).length

        //   return {
        //     ...item,
        //     count,
        //   }
        // })
        const info = {
          filter: {
            category: data.map((d) => ({
              en: d.apiso_Title_txt[0],
              zh: d.apiso_Title_txt[1],
            })),
          },
          dataset: data.reduce(
            (result, d) => [
              ...result,
              ...d.feature.features.map((f) => ({
                id: f.properties.GmlID,
                category: d.apiso_Title_txt,
                coordinates: {
                  lng: f.geometry.coordinates[0],
                  lat: f.geometry.coordinates[1],
                },
                title: [
                  f.properties.NAME_EN || f.properties.Facility_Name_EN,
                  f.properties.NAME_TC || f.properties.Facility_Name_TC,
                ],
              })),
            ],
            []
          ),
        }
        // console.log(
        //   data
        //     .reduce(
        //       (result, d) => [
        //         ...result,
        //         ...d.feature.features.map((f) => ({
        //           ...f,
        //         })),
        //       ],
        //       []
        //     )
        //     .filter((i) => i.properties.NAME_EN == null)
        // )

        // console.log(info.dataset[0])
        setDatasetInfo(info)
      })
  }, [])

  const { filter: { category, provider } = {} } = datasetInfo

  // const handleChange = (event, newValue) => {
  //   console.log(`value: ${value}`)
  //   // setValue(newValue)
  //   // popoverAnchor.current = event.currentTarget
  // }

  // const handlePopoverClose = () => {
  //   setValue(false)
  // }

  const handleTabClick = (index) => {
    // console.log(index)
    setValue((currentVal) => (currentVal === index ? false : index))
  }

  const handleCategoryItemClick = (event, item) => {
    // console.log(item)
    setSelectedCategory(item.en == 'All' ? {} : item)
    setValue(false) /* close tab */
  }
  const handleProviderItemClick = (event, item) => {
    // console.log(item)
    setSelectedProvider(item.en == 'All' ? null : item.en)
    setValue(false) /* close tab */
  }

  const checkItemSelected = (selectedValue) => (item) =>
    selectedValue == item.en

  return (
    <>
      <Box
        sx={{
          //
          // borderColor: 'blue.50',
          borderTop: 1,
          borderBottom: 1,
          borderColor: '#f0f4f5',
          // bgcolor: '#f0f4f5',
          mt: 1,
        }}
      >
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <TuneIcon sx={{ ml: 1 }} />
          <Tabs
            // variant='fullWidth'
            indicatorColor="transparent"
            value={value}
            // onChange={handleChange}
            variant="scrollable"
            // aria-label='basic tabs example'
            sx={{
              alignItems: 'center',
              minHeight: 60,
              // px: {
              //   xs: 1,
              //   sm: 2,
              // },
              '& .MuiTab-root': {
                border: 1,
                borderRadius: 6,
                mx: 1,
                py: 1,
                px: 1.5,
                minHeight: 0,
                borderColor: 'divider',
                // bgcolor: 'white',
              },
            }}
          >
            {tabList.map(({ defaultTitle, selectedTitle, icon }, index) => (
              <Tab
                key={defaultTitle}
                label={
                  selectedTitle ? (
                    <SpanWithTitle>{selectedTitle}</SpanWithTitle>
                  ) : (
                    <SpanWithTitle>{defaultTitle}</SpanWithTitle>
                  )
                }
                // icon={
                //   value === index ? (
                //     <ExpandMoreIcon />
                //   ) : (
                //     <KeyboardArrowRightIcon />
                //   )
                // }
                icon={icon}
                iconPosition="start"
                {...a11yProps(index)}
                onClick={() => handleTabClick(index)}
                sx={{
                  // color: selectedTitle ? 'primary.main' : null,
                  width: 150,
                  maxHeight: 42,
                  '& > span:first-of-type': {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flexGrow: 1,
                    textAlign: 'start',
                  },
                }}
              />
            ))}
          </Tabs>
        </Stack>

        <Stack direction="row" sx={{ mx: 1, mt: -1, justifyContent: 'end' }}>
          <Typography variant="subtitle">
            {dataset.length +
              `${language == 'en' ? ' ' : '個'}` +
              (dataset.length > 1
                ? resource['facilities']
                : resource['facility'])}
          </Typography>
        </Stack>

        {/* <Popover
          open={value === 0 && popoverAnchor.current != null}
          anchorEl={popoverAnchor.current}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          Category
        </Popover>
        <Popover
          open={value === 1 && popoverAnchor.current != null}
          anchorEl={popoverAnchor.current}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          Provider
        </Popover> */}
      </Box>

      <Box
        ref={tabPanelContainer}
        sx={{
          position: 'relative',
          height: {
            xs: 'calc(100%  - 48px - 70px - 24px + 8px)',
            sm: 'calc(100%  - 56px - 70px - 24px + 8px)',
          },
          overflow: 'hidden',
          // bgcolor: 'divider',
          // '& > .MuiBox-root': {
          //   bgcolor: 'divider',
          // },
          //
          // px: {
          //   xs: 1,
          //   sm: 2,
          // },
          // pt: {
          //   xs: 1,
          //   sm: 2,
          // },
        }}
      >
        <DatasetList dataset={dataset} />

        <TabPanel value={value} index={0} containerRef={tabPanelContainer}>
          <RenderList
            list={category}
            icon={<CategoryIcon />}
            firstItem={{
              en: 'All',
              zh: '全部',
            }}
            hideFirstIcon
            handleItemClick={handleCategoryItemClick}
            checkItemSelected={checkItemSelected(selectedCategory)}
          />
        </TabPanel>
        {/* <TabPanel value={value} index={1} containerRef={tabPanelContainer}>
          <RenderList
            list={provider}
            icon={<AccountBalanceIcon />}
            firstItem={{
              en: 'All',
              zh_hk: '全部',
            }}
            hideFirstIcon
            handleItemClick={handleProviderItemClick}
            checkItemSelected={checkItemSelected(selectedProvider)}
          />
        </TabPanel> */}
      </Box>
    </>
  )
}

export default FilterTab
