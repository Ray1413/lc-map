import { useMap } from 'react-leaflet'

function AttributionPrefix() {
  const map = useMap()
  map.attributionControl.setPrefix(
    '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">Leaflet</a>'
  )

  return null
}

export default AttributionPrefix
