<script lang="ts" setup>
  import { useStore } from './data/store'
  // import { storeToRefs } from 'pinia'

  const store = useStore()
  // const {  } = storeToRefs(store)

  store.initStaticData()

  const src = computed(() => store.src)
  const des = computed(() => store.des)

  watchEffect(() => {
    if(!src.value || !des.value) {
      return
    }

    store.switchToNewDirection(src.value, des.value)
  })

  const onResizeHandler = () => {
    const bodyEl = window.document.body
    store.setAppSizes({ width: bodyEl.clientWidth, height: bodyEl.clientHeight})
  }

  onMounted(() => {
    const bodyEl = window.document.body
    store.setAppSizes({ width: bodyEl.clientWidth, height: bodyEl.clientHeight})

    window.addEventListener('resize', onResizeHandler)
  })
</script>
<template>
  <ElContainer class="r text-center pt3" style="height: 100%;">
    <ElHeader class="text-center">Рассчитать дешёвый маршрут</ElHeader>
    <ElContainer>
      <ElAside width="340px">
        <FilterCard />
      </ElAside>
      <ElContainer
        direction="vertical"
        class="px4 flex flex-col between"
      >
        <ElMenu>
          <RoutesPull />
        </ElMenu>
        <Pagination />
      </ElContainer>
    </ElContainer>
  </ElContainer>
</template>
