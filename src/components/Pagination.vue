<script setup lang="ts">
  import { useStore } from '~/data/store'
  import { storeToRefs } from 'pinia'

  const store = useStore()
  const {
    src,
    des,
    pagerCount,
    routesPerPage,
    filteredRoutesLength,
  } = storeToRefs(store)

  const routesSearchFinished = computed(() => store.getRoutesSearchFinished)

  const handleCurrentChange = (value: number) => {
    store.setCurrentPage(value)
  }
</script>
<template>
  <div class="flex flex-row j-center a-center">
    <ElPagination
      :page-size="routesPerPage"
      :pager-count="pagerCount"
      layout="prev, pager, next"
      :total="filteredRoutesLength"
      @current-change="handleCurrentChange"
      :disabled="!src || !des"
    >
    </ElPagination>
    <Spinner :size="16" v-show="!!src && !!des && !routesSearchFinished" visible />
  </div>
</template>
