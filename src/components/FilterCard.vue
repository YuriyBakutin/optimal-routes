<script lang="ts" setup>
  import PointRoles from '~/data/types/PointRoles';
</script>
<template>
  <el-card class="box-card flex flex-col ml4" >
    <CountrySelect :pointRole="PointRoles.src" />
    <CountrySelect :pointRole="PointRoles.des" />
  </el-card>
</template>
