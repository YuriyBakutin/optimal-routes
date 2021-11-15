import { defineStore } from 'pinia'
import IRouteUI from './types/IRouteUI'
import initPaths from '~/data/helpers/initPaths'
import * as callData from '../../data/call-paths.json'
import nonReactiveData from './nonReactive'
import ManagingRouteSearch from './types/ManagingRouteSearch'
import PointRoles from './types/PointRoles'

export const useStore = defineStore('main', {
  state: () => ({
    src: null as null | string,
    des: null as null | string,
    routes: {} as { [src: string]: { [des: string]: IRouteUI[] } },
    selectedPage: 0,
    routesPerPage: 5,
    checkedRoutesFilters: [] as number[],
    enabledRoutesFilters: [] as boolean[],
    appHeight: 0
  }),
  getters: {
    getNodeByRole: (state) => {
      return (role: PointRoles) => state[role]
    },
    getMaxNumberOfRouteLinks: (state) => {
      if (
        !state.src
        || !state.des
        || !state.routes[state.src]
        || !state.routes[state.src][state.des]
        || state.routes[state.src][state.des].length === 0
      ) {
        return 0
      }

      const routes = [...state.routes[state.src][state.des]]
      routes.sort((r1, r2) => r2.links.length - r1.links.length)

      return routes[0]?.links.length
    },
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
    },
    initEnabledRoutesFilters() {
      if (
        !this.src
        || !this.des
        || !this.routes[this.src]
        || !this.routes[this.src][this.des]
        || this.routes[this.src][this.des].length === 0
      ) {
        return 0
      }

      const routes = [...this.routes[this.src][this.des]]

      this.enabledRoutesFilters = routes.reduce((a, route) => {
        a[route.links.length] = true

        return a
      }, [] as boolean[])
    },
    setCheckedRoutesFilters(checkedRoutesFilters: number[]) {
      this.checkedRoutesFilters = checkedRoutesFilters
    },
    setAppHeight(appHeight: number) {
      this.appHeight = appHeight

      // Заголовок и подвал по 60px. Высота таблички маршрута с отступом 105px
      this.routesPerPage = Math.floor((appHeight - 60 - 60 - 10) / 105)
    },
  },
})
