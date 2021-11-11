<script lang="ts" setup>
  import { useStore } from './store'
import FilterCard from './components/FilterCard.vue';
  // import { storeToRefs } from 'pinia'

  const store = useStore()
  // const {  } = storeToRefs(store)

  store.initStaticData()

  const activeIndex = ref('1')
</script>
<template>
  <ElContainer class="text-center">
    <ElHeader class="text-center">Рассчитать дешёвый маршрут</ElHeader>
    <el-container>
      <el-aside width="340px">
        <FilterCard />
      </el-aside>
      <el-container
        direction="vertical"
      >
        <el-menu>Connection routes</el-menu>
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
        >
        <el-menu-item index="1">1</el-menu-item>
        <el-menu-item index="2">2</el-menu-item>
        <el-menu-item index="3">3</el-menu-item>
        </el-menu>
      </el-container>
    </el-container>
  </ElContainer>
</template>
