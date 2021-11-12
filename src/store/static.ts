import IPath from '~/store/types/IPath'
import IGraph from '~/store/types/IGraph'

export default {
  paths: {} as IPath,
  countriesList: [] as { value: string, label: string }[],
  currentGraph: {} as IGraph,
}