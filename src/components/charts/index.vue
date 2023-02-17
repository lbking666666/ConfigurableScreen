<template>
	<div class="charts-wrapper">
        <barCharts />
    </div>
</template>

<script setup lang="ts" name="components-charts">
import { defineAsyncComponent} from 'vue';
const barCharts:object = defineAsyncComponent(() => import('@c/charts/barCharts.vue'));

</script>
<style scoped lang="less">
.charts-wrapper{
    width:100%;
    height:100%;
}
</style>