import { Suspense, lazy } from 'react'

const LazyLoadSearchPanel = lazy(() => import('./SearchPanel'))

function index() {
  return (
    <Suspense fallback={'Loading'}>
      <LazyLoadSearchPanel />
    </Suspense>
  )
}

export default index

// export { default } from './SearchPanel'
