import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import useGlobalSetting from '@/hooks/useGlobalSetting'

function ExposeMap() {
  const map = useMap()
  const { setMap } = useGlobalSetting()

  useEffect(() => {
    setMap(map)
  }, [])

  return null
}

export default ExposeMap
