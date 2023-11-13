import FormControl from '@mui/material/FormControl'

import Visibility from '@mui/icons-material/Visibility'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import SearchBar from './SearchBar'

import useGlobalSetting from '../../../../hooks/useGlobalSetting'

import FilterTab from './FilterTab'

function SearchPanel() {
  // const [searchText, setSearchText] = useState('')
  const { searchText, setSearchText } = useGlobalSetting()

  return (
    <>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FilterTab searchText={searchText} />
    </>
  )
}

export default SearchPanel
