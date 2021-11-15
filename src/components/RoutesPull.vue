<script lang="ts" setup>
  import { useStore } from '~/data/store'
  import { storeToRefs } from 'pinia'

  const store = useStore()
  const {
    src,
    des,
    routes,
    routesPerPage,
    checkedRoutesFilters,
    firstVisibleRouteIndex,
  } = storeToRefs(store)

  const routesShown = computed(() => {
    if (!src.value || !des.value) {
      return []
    }

    const nextPageRoutesIndex = firstVisibleRouteIndex.value + routesPerPage.value

    if (!routes.value[src.value]) {
      store.initRoutesBySrc()
    }

    if (!routes.value[src.value][des.value]) {
      store.initRoutesByDes()
    }

    const filteredRoutes = routes.value[src.value][des.value].filter(
      (route) => {
        const additionalNodesNumber = route.links.length - 1

        return checkedRoutesFilters.value.includes(additionalNodesNumber)
      }
    )

    store.setFilteredRoutesLength(filteredRoutes.length)

    return filteredRoutes.slice(firstVisibleRouteIndex.value, nextPageRoutesIndex)
  })

</script>
<template>
  <Route v-for="route in routesShown" :route="route" />
</template>
