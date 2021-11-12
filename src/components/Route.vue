<script lang="ts" setup>
  import IRoute from '~/store/types/IRoute'

  const props = defineProps<{
    route: IRoute,
  }>()

</script>
<template>
  {{props.route.prise}}
</template>