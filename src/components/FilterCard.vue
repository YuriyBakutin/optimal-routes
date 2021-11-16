<script lang="ts" setup>
  import PointRoles from '~/data/types/PointRoles'
  import connectionsNumberPhrase from './helpers/connectionsNumberPhrase'
  import { useStore } from '~/data/store'
  import { storeToRefs } from 'pinia'

  const store = useStore()
  const { enabledRoutesFilters, appHeight } = storeToRefs(store)

  const filterPullHeight = computed(() => {
    return (appHeight.value - 12 - 60 - 146 - 22) + 'px'
  })

  const numberOfCheckboxes = computed(() => {
    store.initEnabledRoutesFilters()

    return store.getMaxNumberOfRouteLinks
  })

  const checkAllDisabled = computed(() => !(numberOfCheckboxes.value > 0))

  const nodeRange = computed(
    () => Array.from({ length: numberOfCheckboxes.value }, (v, i) => i)
  )

  const checkAll = ref(false)
  const checkedRoutesFilters = ref([] as number[])
  const isIndeterminate = ref(false)

  const handleCheckAllChange = (value: boolean) => {
    checkedRoutesFilters.value = value ? nodeRange.value : []
    isIndeterminate.value = false

    store.setCheckedRoutesFilters(checkedRoutesFilters.value)
  }

  const handleCheckedCitiesChange = (value: number[]) => {
    checkedRoutesFilters.value = value
    const checkedCount = value.length
    checkAll.value = checkedCount === nodeRange.value.length

    isIndeterminate.value =
      checkedCount > 0 && checkedCount < nodeRange.value.length

    store.setCheckedRoutesFilters(checkedRoutesFilters.value)
  }

  store.setCheckedRoutesFilters(checkedRoutesFilters.value)
</script>
<template>
  <div
    class="el-card is-always-shadow box-card flex flex-col ml4 p4 size-4"
    style="font-size: 36px;"
  >
    <CountrySelect :pointRole="PointRoles.src" />
    <CountrySelect :pointRole="PointRoles.des" />
    <div
      class="filter-pull lex flex-col text-left"
      style="overflow-y: scroll;"
    >
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
        :disabled="checkAllDisabled"
        checked
        >Все</el-checkbox
      >
      <el-checkbox-group
        v-model="checkedRoutesFilters"
        @change="handleCheckedCitiesChange"
        class="flex flex-col"
      >
        <el-checkbox
          v-for="additionalNodesCase in nodeRange"
          :key="additionalNodesCase"
          :label="additionalNodesCase"
          checked
          :disabled="!enabledRoutesFilters[additionalNodesCase + 1]"
        >
          {{connectionsNumberPhrase(additionalNodesCase)}}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<style>
.filter-pull {
  max-height: v-bind(filterPullHeight);
}
</style>