<script lang="ts" setup>
  import { useStore } from '~/store'
  import { storeToRefs } from 'pinia'

  const store = useStore()
  const {
    routes,
    selectedPage,
    routesPerPage,
  } = storeToRefs(store)

  const routesShown = computed(() => {
    const pageRoutesIndex = selectedPage.value * routesPerPage.value
    const nextPageRoutesIndex = pageRoutesIndex + routesPerPage.value

    return routes.value.slice(pageRoutesIndex, nextPageRoutesIndex)
  })

</script>
<template>
  <Route v-for="route in routesShown" :route="route" />
</template>