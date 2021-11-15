import IPath from "~/data/types/IPath"
import IGraph from '~/data/types/IGraph'
import nonReactive from "../nonReactive"

export default (paths: IPath[][][]) => {
  const graph: IGraph = {}

  for (const src in paths) {
    graph[nonReactive.nodes[src]] = {}
    for (const des in paths[src]) {
      const path = paths[src][des]
      graph[nonReactive.nodes[src]][nonReactive.nodes[des]] = path[0].price
    }
  }

  return graph
}