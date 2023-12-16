import { useMapEvents } from 'react-leaflet'
import useGlobalSetting from '@/hooks/useGlobalSetting'

function SetMapEvents() {
  const { setMapLoaded } = useGlobalSetting()

  const map = useMapEvents({
    layeradd: (e) => {
      if (e.layer.getMaplibreMap) {
        const glMap = e.layer.getMaplibreMap()
        glMap.on('load', () => {
          // console.log('load')
          setMapLoaded(true)
        })
      }
    },
  })

  return null
}

export default SetMapEvents
