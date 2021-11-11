<script lang="ts" setup>
import PointRoles from '~/store/types/PointRoles';

</script>
<template>
    <CountrySelect :pointRole="PointRoles.src" />
    <CountrySelect :pointRole="PointRoles.des" />
</template>
