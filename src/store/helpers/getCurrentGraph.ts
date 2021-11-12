import IPath from "~/store/types/IPath"
import IGraph from '~/store/types/IGraph'

export default (paths: IPath) => {
  const graph: IGraph = {}

  for (const src in paths) {
    graph[src] = {}
    for (const des in paths[src]) {
      const path = paths[src][des]
      graph[src][des] = path.links[path.viewedIndex].price
    }
  }

  return graph
}