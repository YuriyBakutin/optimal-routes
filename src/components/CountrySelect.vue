<script setup lang="ts">
  import PointRoles from '~/store/types/PointRoles'
  import staticData from '~/store/static'
  import { useStore } from '~/store'
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

   const countriesList = computed(() => (staticData.countriesList.filter(
    (countryData) => (countryData.value !== busyCountry.value)
  )))
</script>

<template>
  <el-select-v2
    v-model="node"
    :options="countriesList"
    :placeholder="placeholder"
    clearable
    style="width: 280px"
    class="mb3 text-left"
  />
</template>
