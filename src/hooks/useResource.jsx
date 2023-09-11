import { useState } from 'react'
import { getResource } from '@/resources'

function useResource(lang) {
  const [resource, setResource] = useState({})

  return () => {
    getResource(lang).then((data) => setResource(data))
    return resource
  }
}

export default useResource
