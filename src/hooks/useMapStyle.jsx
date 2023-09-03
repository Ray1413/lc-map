import { useState, useMemo } from 'react'

const getCacheFromLocalStorage = () =>
  new Map(JSON.parse(localStorage.getItem('mapStyleCache') || '[]'))
const saveCacheToLocalStorage = (cache) =>
  localStorage.setItem(
    'mapStyleCache',
    JSON.stringify(Array.from(cache.entries()))
  )

const cache = getCacheFromLocalStorage()

function useMapStyle(url) {
  const [style, setStyle] = useState(null)

  useMemo(() => {
    const cacheStyle = cache.get(url)
    if (cacheStyle) {
      setStyle(cacheStyle)
    }

    fetch(url)
      .then((res) => res.json())
      .then((style) => {
        delete style.sources.esri.url
        style.sources.esri.tiles = [
          `${url.replace(
            '/resources/styles/root.json',
            ''
          )}/tile/{z}/{y}/{x}.pbf`,
        ]
        if (style.sprite && style.sprite.indexOf('http') === -1) {
          style.sprite = url.replace(
            'styles/root.json',
            style.sprite.replace('../', '')
          )
        }
        if (style.glyphs && style.glyphs.indexOf('http') === -1) {
          style.glyphs = url.replace(
            'styles/root.json',
            style.glyphs.replace('../', '')
          )
        }
        style.sources.esri.maxzoom = 15

        cache.set(url, style)
        saveCacheToLocalStorage(cache)

        // console.log(style)
        setStyle(style)
      })
  }, [url])

  return style
}

export default useMapStyle
