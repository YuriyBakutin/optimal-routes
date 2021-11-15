<script lang="ts" setup>
  const props = defineProps<{
    node: string,
  }>()

</script>
<template>
  <div class="rd bg-gray-600 text-white py0 px1" style="height: auto;">
    {{props.node}}
  </div>
</template>
