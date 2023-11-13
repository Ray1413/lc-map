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
import MarkerClusterLayer from './MarkerClusterLayer'
import ExposeMap from './ExposeMap'

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

  // const markerList = dataset || []
  const markerList = useFilteredDataset().map((d) => d.marker)

  useEffect(() => {
    ;(async () => {
      const info = await fetchFacility()
      info.dataset = info.dataset.map((d) => {
        const marker = L.marker(d.coordinates).bindPopup(
          // language == 'en' ? m.title[0] : m.title[1]
          `<div>
            <div>${d.resources[language]['title']}</div>
            <div>${d.resources[language]['address']}</div>
            <div class='facility'>${d.resources[language]['facilities']}</div>
          </div>`,
          { className: 'popup-card' }
        )

        return {
          ...d,
          marker,
        }
      })
      // console.log(info.dataset.slice(0, 4))
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
        <ExposeMap />
        <AttributionPrefix />
        <Control />

        <HKVectorTileLayer url="https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/basemap/WGS84/resources/styles/root.json" />
        <HKVectorTileLayer
          url={`https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/label/hk/${langValue}/WGS84/resources/styles/root.json`}
          pane="overlayPane"
        />

        {/* {markerList.slice(0, 50).map((m) => (
          <Marker key={m.title[0]} position={m.coordinates}>
            <Popup>
              {language === 'en' ? m.title[0] : m.title[1]}
              <br />
              {language === 'en' ? m.title[1] : m.title[0]}
            </Popup>
          </Marker>
        ))} */}

        {/* {language === 'en' ? null : (
          <MarkerClusterLayer markerList={markerList} />
        )} */}
        <MarkerClusterLayer markerList={markerList} />
      </MapContainer>
    </div>
  )
}

export default Map
