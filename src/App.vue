<template>
  <ElContainer class="text-center">
    <ElHeader class="text-center">Рассчитать дешёвый маршрут</ElHeader>
    <el-container>
      <el-aside width="300px">Filters</el-aside>
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
<script lang="ts" setup>
const activeIndex = ref('1')
</script>
