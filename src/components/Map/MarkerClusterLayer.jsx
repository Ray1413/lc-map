import { useEffect, useRef, useCallback } from 'react'
import { useMap } from 'react-leaflet'
import 'leaflet.markercluster'
import useGlobalSetting from '@/hooks/useGlobalSetting'

export default function MarkerClusterLayer({ markerList = [] }) {
  // console.log('MarkerClusterLayer')
  const map = useMap()
  const markersRef = useRef(null)
  const zoomLevel = 15
  const { selectedFacility } = useGlobalSetting()

  useEffect(() => {
    // console.log('MarkerClusterLayer, useEffect2')
    let markers = markersRef.current
    if (!markers) {
      markers = markersRef.current = L.markerClusterGroup({
        disableClusteringAtZoom: zoomLevel,
        spiderfyOnMaxZoom: false,
      })

      map.addLayer(markers)
    }

    return () => {
      // console.log('MarkerClusterLayer, useEffect2:return')

      if (markers) {
        map.removeLayer(markers)
        markersRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const markers = markersRef.current
    if (markers) {
      markers.clearLayers()
      markers.addLayers(markerList)
    }
  }, [markerList])

  useEffect(() => {
    // let markers = markersRef.current
    // console.log(selectedFacility)
    const { marker } = selectedFacility

    const showMarker = () => {
      // console.log('showMarker')
      marker.openPopup()
      map.off('moveend', showMarker)
      map.off('zoomend', showMarker)
    }

    if (marker) {
      // map.flyTo(marker.getLatLng(), zoomLevel)
      // marker.openPopup()
      // if (markers) {
      //   // const onMoveend = () => {
      //   //   marker.openPopup()
      //   //   map.off('moveend', onMoveend)
      //   //   console.log('moveend')
      //   // }
      //   // map.on('moveend', onMoveend)
      //   map.once('moveend', () => {
      //     marker.openPopup()
      //     console.log('moveend')
      //   })
      //   // const onZoomend = () => {
      //   //   marker.openPopup()
      //   //   map.off('zoomend', onZoomend)
      //   //   console.log('zoomend')
      //   // }
      //   // map.on('zoomend', onZoomend)
      //   map.once('zoomend', () => {
      //     marker.openPopup()
      //     console.log('zoomend')
      //   })
      //   // const onAnimationend = (e) => {
      //   //   marker.openPopup()
      //   //   markers.off('animationend', onAnimationend)
      //   // }
      //   // markers.on('animationend', onAnimationend)
      //   markers.once('animationend', () => {
      //     marker.openPopup()
      //     console.log('animationend')
      //   })
      // }

      ////////////////////////////////
      map.once('moveend', showMarker)
      map.once('zoomend', showMarker)
      map.setView(marker.getLatLng(), Math.max(map.getZoom(), zoomLevel), {
        animate: true,
      })
    }

    return () => {
      if (showMarker) {
        map.off('moveend', showMarker)
        map.off('zoomend', showMarker)
      }
    }
  }, [selectedFacility])

  return null
}
