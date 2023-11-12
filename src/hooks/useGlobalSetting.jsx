'use client'

import { createContext, useContext, useState } from 'react'

const GlobalSettingContext = createContext(null)

const GlobalSettingContextProvider = GlobalSettingContext.Provider

const useDefaultSetting = () => {
  // const [lang, setLang] = useState(defaultLang)
  const [resource, setResource] = useState({})

  const [datasetInfo, setDatasetInfo] = useState({})

  const [searchPanelLoaded, setSearchPanelLoaded] = useState(false)
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false)

  const [selectedFacility, setSelectedFacility] = useState({})
  // const [selectedDatasetId, setSelectedDatasetId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState({})
  // const [selectedProvider, setSelectedProvider] = useState(null)

  // const [geojsonURL, setGeojsonURL] = useState(null)
  // const [geojsonData, setGeojsonData] = useState(null)

  // const [fetchingDataset, setFetchingDataset] = useState(false)

  const [searchText, setSearchText] = useState('')

  // const handleDatasetItemClick = (event, id, url) => {
  //   setGeojsonData(null)
  //   setGeojsonURL(null)
  //   if (window.fetchDatasetController) {
  //     window.fetchDatasetController.abort()
  //   }
  //   setFetchingDataset(false)

  //   setSelectedDatasetId(id === selectedDatasetId ? null : id)
  //   if (id != selectedDatasetId && url) {
  //     // console.log(url)
  //     // setGeojsonURL(null)
  //     setFetchingDataset(true)
  //     setIsSearchPanelOpen(false)
  //     const currentController = new AbortController()
  //     window.fetchDatasetController = currentController
  //     const signal = window.fetchDatasetController.signal

  //     fetch(url, { signal })
  //       .then((res) => res.json())
  //       .then((jsonData) => {
  //         console.log('jsonData')
  //         setGeojsonData(jsonData)
  //         setGeojsonURL(url)
  //       })
  //       .catch((err) => {
  //         console.error(err)
  //       })
  //       .finally(() => {
  //         if (window.fetchDatasetController == currentController) {
  //           setFetchingDataset(false)
  //         }
  //       })
  //   }
  //   // else {
  //   //   setGeojsonData(null)
  //   //   setGeojsonURL(null)
  //   // }
  // }

  const defaultSetting = {
    // lang,
    // setLang,
    resource,
    setResource,
    datasetInfo,
    setDatasetInfo,
    searchPanelLoaded,
    setSearchPanelLoaded,
    isSearchPanelOpen,
    setIsSearchPanelOpen,
    // selectedDatasetId,
    // handleDatasetItemClick,
    // geojsonURL,
    // setGeojsonURL,
    // geojsonData,
    // setGeojsonData,
    // fetchingDataset,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    // selectedProvider,
    // setSelectedProvider,
    selectedFacility,
    setSelectedFacility,
  }
  return defaultSetting
}

export { GlobalSettingContextProvider, useDefaultSetting }

export default () => useContext(GlobalSettingContext)
