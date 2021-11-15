<script lang="ts" setup>
  import IRouteLink from '~/data/types/IRouteLink'

  const props = defineProps<{
    link: IRouteLink,
  }>()

</script>
<template>
  <div class="flex flex-col a-center">
    <div class="rd-3 px2 bg-orange-600 text-white py0 px1 mb2">
      {{props.link.company}} {{props.link.price}}$
    </div>
      <i-bi-arrow-right />
  </div>
  <Node :node="props.link.des" />
</template>
