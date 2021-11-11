import { defineStore } from 'pinia'
import ILink from '~/store/types/ILink'
import initLinks from '~/store/helpers/initLinks'
import * as callData from '../../data/call-paths.json'

const staticData = {
  links: {} as ILink,
  country: {} as { [key: string]: string }
}

export const useStore = defineStore('main', {
  state: () => ({
    src: null,
    dis: null,
    routes: [],
  }),
  getters: {},
  actions: {
    initStaticData() {
      staticData.country = callData.data.country
      staticData.links = initLinks(callData.data.company)
    }
  },
})
