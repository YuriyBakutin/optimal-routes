<script lang="ts" setup>
  import IRouteUI from '~/data/types/IRouteUI'

  const props = defineProps<{
    route: IRouteUI,
  }>()

</script>
<template>
  <el-card class="box-card mb3" >
    <div class="flex flex-row between a-center">
      <el-avatar class="bg-orange-600">{{props.route.prise}}$</el-avatar>
      <div class="ml4 fit flex flex-row j-center a-end">
        <Node :node="props.route.src" />
        <Link v-for="link in props.route.links" :link="link" />
      </div>
    </div>
  </el-card>
</template>
