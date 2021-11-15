import { defineStore } from 'pinia'
import IRouteUI from './types/IRouteUI'
import IRouteLink from './types/IRouteLink'
import initPaths from '~/data/helpers/initPaths'
import getCurrentGraph from '~/data/helpers/getCurrentGraph'
import * as callData from '../../data/call-paths.json'
import nonReactiveData from './nonReactive'
import ManagingRouteSearch from './types/ManagingRouteSearch'
import PointRoles from './types/PointRoles'
import GetOptimalPathWorker from './workers/getOptimalPath?worker'

const optimalPathWorker = new GetOptimalPathWorker()

export const useStore = defineStore('main', {
  state: () => ({
    src: null as null | string,
    des: null as null | string,
    routes: {} as { [src: string]: { [des: string]: IRouteUI[] } },
    selectedPage: 0,
    routesPerPage: 5,
  }),
  getters: {
    getNodeByRole: (state) => {
      return (role: PointRoles) => state[role]
    }
  },
  actions: {
    initStaticData() {
      const { paths, nodeIndexes, nodes, countriesList } = initPaths(
        callData.data.company, callData.data.country
      )
      nonReactiveData.paths = paths
      nonReactiveData.countriesList = countriesList
      nonReactiveData.nodeIndexes = nodeIndexes
      nonReactiveData.nodes = nodes
      // nonReactiveData.currentGraph = getCurrentGraph(nonReactiveData.paths)
    },
    setNodeByRole(role: PointRoles, node: string | null) {
      this[role] = node
    },
    initRoutesBySrc() {
      this.routes[this.src as string] = {}
    },
    initRoutesByDes() {
      this.routes[this.src as string][this.des as string] = []
    },
    addRoute({ src, des, routeUI }: { src: string, des: string, routeUI: IRouteUI }) {
      this.routes[src][des].push(routeUI)
      console.log('this.routes: ', this.routes)
    },
    getRoutes(src: string | null, des: string | null) {
      if (!src || !des) {
        return
      }

      optimalPathWorker.postMessage(
        { currentGraph: getCurrentGraph(nonReactiveData.paths), src, des }
      )

      optimalPathWorker.onmessage = (event) => {
        const result = event.data.result
        const links: IRouteLink[] = []

        let src = this.src as string

        result.path.forEach((node: string, index: number) => {
          if (index === 0) {
            return
          }

          const des = node
          const path = nonReactiveData.paths[
            nonReactiveData.nodeIndexes[src]
          ][
            nonReactiveData.nodeIndexes[des]
          ]
          const link = path[0]

          const routeLink: IRouteLink = {
            des: node,
            ...link
          }

          links.push(routeLink)

          src = des
        })

        const route = {
          prise: result.distance as number,
          src: this.src as string,
          links,
        }

        this.routes[this.src as string][this.des as string].push(route)
      }
    },
    switchToNewDirection(src: string, des: string) {
      const srcIndex = nonReactiveData.nodeIndexes[src]
      const desIndex = nonReactiveData.nodeIndexes[des]

      if (!nonReactiveData.managingRouteSearch[srcIndex]) {
        nonReactiveData.managingRouteSearch[srcIndex] = []

      }

      if (!nonReactiveData.managingRouteSearch[srcIndex][desIndex]) {
        nonReactiveData.managingRouteSearch[
          srcIndex
        ][
          desIndex
        ] = new ManagingRouteSearch(src, des)
      } else {
        nonReactiveData.managingRouteSearch[
          srcIndex
        ][
          desIndex
        ].setSrcAndDes({ srcIndex, desIndex })
      }
    }
  },
})
