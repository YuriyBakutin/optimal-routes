import IPath from '~/data/types/IPath'
import ManagingRouteSearch from './types/ManagingRouteSearch'

export default {
  nodes: [] as string[], // Array of country codes
  nodeIndexes: {} as { [node: string]: number },
  paths: [] as IPath[][][],
  countriesList: [] as { value: string, label: string }[],
  managingRouteSearch: [] as ManagingRouteSearch[][]
}
