<script setup lang="ts">
  import PointRoles from '~/data/types/PointRoles'
  import nonReactiveData from '~/data/nonReactive'
  import { useStore } from '~/data/store'
  import { storeToRefs } from 'pinia'

  const store = useStore()
  const { src, des } = storeToRefs(store)

  const pointRolesText = {
    src: 'звонящую',
    des: 'принимающую',
  }

  const props = defineProps<{
    pointRole: PointRoles,
  }>()

  const node = computed({
    get() {
      return store.getNodeByRole(props.pointRole)
    },
    set(value: string | null) {
      store.setNodeByRole(props.pointRole, value)
    }
  })

  const placeholder = computed(() => (
    `Выберите ${pointRolesText[props.pointRole]} сторону`
  ))

  const busyCountry = computed(
    () => props.pointRole === PointRoles.src ? des.value : src.value
  )

   const countriesList = computed(() => (nonReactiveData.countriesList.filter(
    (countryData) => (countryData.value !== busyCountry.value)
  )))
</script>

<template>
  <el-select-v2
    v-model="node"
    :options="countriesList"
    :placeholder="placeholder"
    clearable
    class="mb4 text-left"
  />
</template>
