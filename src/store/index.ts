import { defineStore } from 'pinia'
// import IPath from '~/store/types/IPath'
import IRoute from './types/IRoute'
import IRouteLink from './types/IRouteLink'
import initLinks from '~/store/helpers/initLinks'
import getCountriesList from '~/store/helpers/getCountriesList'
import getCurrentGraph from '~/store/helpers/getCurrentGraph'
import * as callData from '../../data/call-paths.json'
import staticData from './static'
import PointRoles from './types/PointRoles'
import GetOptimalPathWorker from './workers/getOptimalPath?worker'

const optimalPathWorker = new GetOptimalPathWorker()

export const useStore = defineStore('main', {
  state: () => ({
    src: null as null | string,
    des: null as null | string,
    routes: [] as IRoute[],
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
      staticData.countriesList = getCountriesList(callData.data.country)
      staticData.paths = initLinks(callData.data.company, callData.data.country)
      staticData.currentGraph = getCurrentGraph(staticData.paths)
    },
    setNodeByRole(role: PointRoles, node: string | null) {
      this[role] = node
    },
    getRoutes(src: string | null, des: string | null) {
      if (!src || !des) {
        return
      }

      optimalPathWorker.postMessage(
        { currentGraph: staticData.currentGraph, src, des }
      )

      optimalPathWorker.onmessage = (event) => {
        console.log('event: ', event)

        const result = event.data.result
        // { path, distance }

        const links: IRouteLink[] = []

        let src = this.src as string

        result.path.forEach((node: string, index: number) => {
          if (index === 0) {
            return
          }

          const des = node
          const path = staticData.paths[src][des]
          const link = path.links[path.viewedIndex]

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

        this.routes.push(route)
      }
    },
  },
})
