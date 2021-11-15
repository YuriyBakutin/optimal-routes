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

    return routes.value[src.value][des.value].slice(pageRoutesIndex, nextPageRoutesIndex)
  })

</script>
<template>
  <Route v-for="route in routesShown" :route="route" />
</template>
