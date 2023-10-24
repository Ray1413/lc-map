'use client'
import { useEffect } from 'react'
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
import { useParams } from 'next/navigation'
import useGlobalSetting from '@/hooks/useGlobalSetting'
import HKVectorTileLayer from './HKVectorTileLayer'
import AttributionPrefix from './AttributionPrefix'
import Control from './Control'
import useFilteredDataset from '@/hooks/useFilteredDataset'
import fetchFacility from '@/utils/fetchFacility'

function Map() {
  let zoom = 11
  let minZoom = 10
  let maxZoom = 19
  let center = [22.3400052, 114.1545354]
  const maxBounds = [
    [22.583333, 113.816667],
    [22.133333, 114.516667],
  ]

  const { setDatasetInfo } = useGlobalSetting()

  // const markerList = dataset || []
  const markerList = useFilteredDataset()
  // console.log(markerList.length)

  const { language } = useParams()
  let langValue
  switch (language) {
    case 'zh':
      langValue = 'tc'
      break
    case 'en':
      langValue = 'en'
      break
    default:
      langValue = 'tc'
  }

  useEffect(() => {
    ;(async () => {
      const info = await fetchFacility()
      setDatasetInfo(info)
    })()
  }, [])

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
        <AttributionPrefix />
        <Control />

        <HKVectorTileLayer url="https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/basemap/WGS84/resources/styles/root.json" />
        <HKVectorTileLayer
          url={`https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/label/hk/${langValue}/WGS84/resources/styles/root.json`}
          pane="overlayPane"
        />

        {markerList.slice(0, 50).map((m) => (
          <Marker key={m.title[0]} position={m.coordinates}>
            <Popup>
              {language === 'en' ? m.title[0] : m.title[1]}
              <br />
              {language === 'en' ? m.title[1] : m.title[0]}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
