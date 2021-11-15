import IGraph from '~/data/types/IGraph'

export default function dijkstraShortestPath(
  params: { graph: IGraph, start: string, end: string }
): { path: string[], distance: number }
