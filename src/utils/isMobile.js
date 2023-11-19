import isServer from './isServer'

export default () => !isServer() && window.innerWidth < 600
