import Videos from '../components/Videos'

import { VideosProvider } from '../hooks'

export default function Video() {
  return (
    <VideosProvider query={{}}>
      <Videos />
    </VideosProvider>
  )
}
