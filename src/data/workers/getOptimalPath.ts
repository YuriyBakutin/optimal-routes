import dijkstraShortestPath from '~/data/helpers/dijkstraShortestPath.js'

onmessage = function (event) {
  const src = event.data.src
  const des = event.data.des

  const params = {
    graph: event.data.currentGraph,
    start: src,
    end: des,
  }

  const result = dijkstraShortestPath(params)

  postMessage(
    { type: 'optimalPath', result, src, des }
  )
}
