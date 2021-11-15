// See 1 ответ: https://question-it.com/questions/2115536/realizatsija-moego-algoritma-dejkstry-ne-vozvraschaet-kratchajshij-put

const MinHeap = { // A collection of functions that operate on an array of [key, ...data] pairs
  siftDown(arr, i = 0, value = arr[i]) {
    if (i >= arr.length) return
    let key = value[0]
    while (true) {
      let j = i * 2 + 1
      if (j + 1 < arr.length && arr[j][0] > arr[j + 1][0]) j++
      if (j >= arr.length || key <= arr[j][0]) break
      arr[i] = arr[j]
      i = j
    }
    arr[i] = value
  },
  pop(arr) {
    return this.exchange(arr, arr.pop())
  },
  exchange(arr, value) {
    if (!arr.length) return value
    let oldValue = arr[0]
    this.siftDown(arr, 0, value)
    return oldValue
  },
  push(arr, value) {
    let key = value[0]
    let i = arr.length
    let j
    while ((j = (i - 1) >> 1) >= 0 && key < arr[j][0]) {
      arr[i] = arr[j]
      i = j
    }
    arr[i] = value
    return arr
  }
}

const dijkstraShortestPath = ({ graph, start, end }) => {
  // Heap with one entry: distance is 0 at start, and there is no previous.
  let heap = [[0, start, null]]
  let prev = {}

  while (heap.length) {
    let [distance, current, cameFrom] = MinHeap.pop(heap)
    if (current in prev) continue // Already visited
    prev[current] = cameFrom // Mark as visited
    if (current == end) { // Found!
      // Reconstruct path
      let path = []
      while (current) {
        path.push(current)
        current = prev[current]
      }
      path.reverse()
      return { path, distance }
    }
    // Push unvisited neighbors on the heap
    for (let [neighbor, edge] of Object.entries(graph[current])) {
      if (!(neighbor in prev)) MinHeap.push(heap, [distance + edge, neighbor, current])
    }
  }
}

export default dijkstraShortestPath
