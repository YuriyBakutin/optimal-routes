import IGraph from '~/store/types/IGraph'

export default function dijkstraShortestPath(
  params: { graph: IGraph, start: string, end: string }
): { path: string[], distance: number }
