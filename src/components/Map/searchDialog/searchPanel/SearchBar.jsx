import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import MenuIcon from '@mui/icons-material/Menu'
import Stack from '@mui/material/Stack'

import useGlobalSetting from '../../../../hooks/useGlobalSetting'

function SearchBar({ searchText, setSearchText }) {
  const { setIsSearchPanelOpen, openFpanel, setOpenFpanel } = useGlobalSetting()

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          px: 1,
          pt: 1,
        }}
      >
        <IconButton
          aria-label="back button"
          edge={false}
          // edge="start"
          onClick={() => setOpenFpanel((open) => !open)}
        >
          {openFpanel ? <ArrowBackIosNewIcon /> : <MenuIcon />}
        </IconButton>

        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          fullWidth
          size="small"
          value={searchText}
          onInput={(event) => setSearchText(event.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                aria-label="search button"
                edge="start"
                style={{ pointerEvents: 'none' }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="close button"
                edge="end"
                onClick={() => setSearchText('')}
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          }
          // label='Password'
        />
      </Stack>
    </>
  )
}

export default SearchBar
