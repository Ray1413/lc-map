import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import '@maplibre/maplibre-gl-leaflet'
import useMapStyle from '@/hooks/useMapStyle'

export default function HKVectorTileLayer({
  url,
  pane = 'tilePane',
  show = true,
}) {
  // console.log('HKVectorTileLayer')
  const map = useMap()
  const style = useMapStyle(url)

  useEffect(() => {
    // console.log('HKVectorTileLayer, useEffect')
    let ignore = false
    let gl

    if (style) {
      gl = L.maplibreGL({
        style: style,
        attribution: style.sources.esri.attribution,
        pane,
      })
      if (show) {
        gl.addTo(map)
      } else {
        gl.remove()
      }
    }

    return () => {
      ignore = true
      if (gl && gl.remove) {
        gl.remove()
      }
    }
  }, [style, show])

  return null
}
