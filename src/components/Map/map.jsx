'use client'

import {
  MapContainer,
  ScaleControl,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Rectangle,
  GeoJSON,
} from 'react-leaflet'
import HKVectorTileLayer from './HKVectorTileLayer'

function Map() {
  let zoom = 11
  let minZoom = 10
  let maxZoom = 19
  let center = [22.3400052, 114.1545354]
  const maxBounds = [
    [22.583333, 113.816667],
    [22.133333, 114.516667],
  ]
  const lang = 'tc'
  return (
    <div style={{ height: '100vh' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        maxBounds={maxBounds}
        maxBoundsViscosity={0.5}
        style={{ height: '100%' }}
      >
        <HKVectorTileLayer url="https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/basemap/WGS84/resources/styles/root.json" />
        <HKVectorTileLayer
          url={`https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/label/hk/${lang}/WGS84/resources/styles/root.json`}
          pane="overlayPane"
        />
      </MapContainer>
    </div>
  )
}

export default Map
