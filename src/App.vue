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
    store.setAppHeight(window.document.body.clientHeight)
  }

  onMounted(() => {
    store.setAppHeight(window.document.body.clientHeight)

    window.addEventListener('resize', onResizeHandler)
  })

  const activeIndex = ref('1')
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
        <ElMenu
          :default-active="activeIndex"
          mode="horizontal"
        >
          <ElMenuItem index="1">1</ElMenuItem>
          <ElMenuItem index="2">2</ElMenuItem>
          <ElMenuItem index="3">3</ElMenuItem>
        </ElMenu>
      </ElContainer>
    </ElContainer>
  </ElContainer>
</template>
