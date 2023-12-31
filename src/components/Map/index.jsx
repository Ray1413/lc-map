import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./map'), {
  ssr: false,
  // loading: () => <div>Loading...</div>,
})

export default Map
