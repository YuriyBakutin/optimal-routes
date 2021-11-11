import { defineStore } from 'pinia'
// import ILink from '~/store/types/ILink'
import initLinks from '~/store/helpers/initLinks'
import getCountriesList from '~/store/helpers/getCountriesList'
import * as callData from '../../data/call-paths.json'
import staticData from './static'
import PointRoles from './types/PointRoles'

export const useStore = defineStore('main', {
  state: () => ({
    src: '',
    des: '',
    routes: [],
    routesPerPage: 5,
  }),
  getters: {
    getCountryByRole: (state) => {
      return (role: PointRoles) => state[role]
    }
  },
  actions: {
    initStaticData() {
      staticData.countriesList = getCountriesList(callData.data.country)
      staticData.links = initLinks(callData.data.company)
    },
    setCountryByRole(role: PointRoles, country: string) {
      this[role] = country
    }
  },
})
