import dijkstraShortestPath from '~/store/helpers/dijkstraShortestPath.js'

onmessage = function (event) {
  const params = {
    graph: event.data.currentGraph,
    start: event.data.src,
    end: event.data.des,
  }

  const result = dijkstraShortestPath(params)

  postMessage(
    { type: 'optimalPath', result }
  )
}
