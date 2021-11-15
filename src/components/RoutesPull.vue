<script lang="ts" setup>
  import { useStore } from '~/data/store'
  import { storeToRefs } from 'pinia'

  const store = useStore()
  const {
    src,
    des,
    routes,
    selectedPage,
    routesPerPage,
    checkedRoutesFilters,
  } = storeToRefs(store)

  const routesShown = computed(() => {
    if (!src.value || !des.value) {
      return []
    }

    const pageRoutesIndex = selectedPage.value * routesPerPage.value
    const nextPageRoutesIndex = pageRoutesIndex + routesPerPage.value

    if (!routes.value[src.value]) {
      store.initRoutesBySrc()
    }

    if (!routes.value[src.value][des.value]) {
      store.initRoutesByDes()
    }

    const filteredRoutes = routes.value[src.value][des.value].filter(
      (route) => {
        // return true
        const additionalNodesNumber = route.links.length - 1
        // console.log('additionalNodesNumber: ', additionalNodesNumber);
        // console.log('checkedRoutesFilters.value: ', checkedRoutesFilters.value);

        // const i = checkedRoutesFilters.value.includes(additionalNodesNumber)
        // console.log('i: ', i);
        return checkedRoutesFilters.value.includes(additionalNodesNumber)
      }
    )

    return filteredRoutes.slice(pageRoutesIndex, nextPageRoutesIndex)
  })

</script>
<template>
  <Route v-for="route in routesShown" :route="route" />
</template>
