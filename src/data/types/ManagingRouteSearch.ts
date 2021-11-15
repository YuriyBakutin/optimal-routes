import IRoute from "./IRoute"
import ICandidate from "./ICandidate"
import ICandidateWithRoute from "./ICandidateWithRoute"
import IRouteLink from "./IRouteLink"
import IGraph from "./IGraph"
import nonReactiveData from "../nonReactive"
import GetOptimalPathWorker from '../workers/getOptimalPath?worker'
import { useStore } from '~/data/store'

let store: any

const optimalPathWorker = new GetOptimalPathWorker()

export default class ManagingRouteSearch {
  candidatesWithoutRoutes: { [key: string]: ICandidate }
  candidatesWithRoutes: { [key: string]: ICandidateWithRoute }
  srcIndex: number
  desIndex: number
  src: string
  des: string
  getOptimalPathWorker: any
  // static paths: IPath[][][]
  static appSrcIndex: number
  static appDesIndex: number

  constructor(src: string, des: string) {
    if (!store) {
      store = useStore()
    }

    this.src = src
    this.des = des
    this.candidatesWithoutRoutes = {}
    this.candidatesWithRoutes = {}
    this.srcIndex = nonReactiveData.nodeIndexes[src]
    this.desIndex = nonReactiveData.nodeIndexes[des]

    const firstCandidate = nonReactiveData.paths.map(
      (pathSrcRow) => pathSrcRow.map((path) => 0)
    )

    this.addCandidate(firstCandidate)

    this.setSrcAndDes({ srcIndex: this.srcIndex, desIndex: this.desIndex })
  }

  async startSearchRoutesLoop() {
    while (true) {
      if (
        ManagingRouteSearch.appSrcIndex !== this.srcIndex
        || ManagingRouteSearch.appDesIndex !== this.desIndex
      ) {
        return
      }

      const key = Object.keys(this.candidatesWithoutRoutes)[0]

      if (!key) {
        // TODO: Здесь должен быть выбор из candidatesWithRoutes
        const candidates = this.candidatesWithRoutes
        const keys = Object.keys(candidates)

        if (keys.length === 0) {
          return
        }

        keys.sort(
          (key1, key2) => candidates[key1].prise - candidates[key2].prise
        )

        const routeUI = this.getRouteUI(keys[0])
        store.addRoute({ src: this.src, des: this.des, routeUI })

        this.addCandidatesByRoute(keys[0])

        delete this.candidatesWithRoutes[keys[0]]

        continue
      }

      const result = await this.getOptimalPath(
        {
          currentGraph: this.getGraph(key),
          src: this.src,
          des: this.des,
        }
      ) as { path: string[], distance: number } | null

      if (result) {
        const route = result.path.map((node) => nonReactiveData.nodeIndexes[node])

        this.candidatesWithRoutes[key] = {
          candidate: this.candidatesWithoutRoutes[key],
          route,
          prise: result.distance,
        }
      }

      delete this.candidatesWithoutRoutes[key]
    }
  }

  getOptimalPath(params: { currentGraph: IGraph, src: string, des: string }) {
    return new Promise((resolve, reject) => {
      const messageEventHandler = (event: any) => {
        const src = event.data.src
        const des = event.data.des

        if (src !== this.src || des !== this.des) {
          return
        }

        optimalPathWorker.removeEventListener('message', messageEventHandler)

        const result = event.data.result
        resolve(result)
      }

      optimalPathWorker.addEventListener('message', messageEventHandler)

      optimalPathWorker.postMessage(params)
    })
  }

  setSrcAndDes({ srcIndex, desIndex }: { srcIndex: number, desIndex: number }) {
    ManagingRouteSearch.appSrcIndex = srcIndex
    ManagingRouteSearch.appDesIndex = desIndex

    this.startSearchRoutesLoop()
  }

  addCandidatesByRoute(key: string) {
    const candidate = this.candidatesWithRoutes[key].candidate
    const route = this.candidatesWithRoutes[key].route
    for (let i = 0; i < route.length - 1; i++) {
      const srcIndex = route[i]
      const desIndex = route[i + 1]

      const nextCandidate = candidate.map(
        (candidateSrsRow, src_) => candidateSrsRow.map(
          (linkIndex, des_) => {
            if (src_ === srcIndex && desIndex === des_) {
              const nextLinkIndex = (linkIndex as number) + 1
              const maxLinkIndex = nonReactiveData.paths[srcIndex][desIndex].length - 1

              if (nextLinkIndex > maxLinkIndex) {
                return null
              } else {
                return nextLinkIndex
              }
            } else {
              return linkIndex
            }
          }
        )
      )

      this.addCandidate(nextCandidate)
    }
  }

  getGraph(key: string) {
    const graph: IGraph = {}
    const candidate = this.candidatesWithoutRoutes[key]

    candidate.forEach((candidateSrsRow, srcIndex) => {
      const src = nonReactiveData.nodes[srcIndex]
      graph[src] = {}

      candidateSrsRow.forEach(
        (linkIndex, desIndex) => {

          if (linkIndex != null) {
            const des = nonReactiveData.nodes[desIndex]
            const prise = nonReactiveData.paths[srcIndex][desIndex][linkIndex].price
            graph[src][des] = prise
          }
        }
      )
    })

    return graph
  }

  getRouteUI(key: string) {
    const route = this.candidatesWithRoutes[key].route

    const links: IRouteLink[] = []
    let prise = 0

    for (let i = 0; i < route.length - 1; i++) {
      let srcIndex = route[i] as number
      let desIndex = route[i + 1] as number

      const path = nonReactiveData.paths[srcIndex][desIndex][
        (this.candidatesWithRoutes[key].candidate[srcIndex] as number[])[desIndex]
      ]

      const routeLink: IRouteLink = {
        des: nonReactiveData.nodes[desIndex],
        ...path
      }

      prise += path.price

      links.push(routeLink)
    }

    return {
      prise,
      src: this.src,
      links,
    }
  }

  getKey(candidate: ICandidate) {
    let key = ''

    key = candidate.reduce(
      (key, candidateSrcRow) => candidateSrcRow.reduce(
        (key, linkIndex) => key + ' ' + linkIndex ?? '?',
        key
      ) + '\n',
      ''
    )

    return key
  }

  addCandidate(candidate: ICandidate) {
    const key = this.getKey(candidate)

    if (!this.candidatesWithRoutes[key]) {
      this.candidatesWithoutRoutes[key] = candidate
    }
  }

  deleteCandidateWithoutRoute(key: string) {
    delete this.candidatesWithoutRoutes[key]
  }

  deleteCandidateWithRoute(key: string) {
    delete this.candidatesWithRoutes[key]
  }

  addRoute({ route, key, prise }: { route: IRoute, key: string, prise: number }) {
    const candidate = this.candidatesWithoutRoutes[key]
    this.deleteCandidateWithoutRoute(key)
    this.candidatesWithRoutes[key] = { candidate, route, prise }
  }
}
