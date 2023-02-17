<template>
	<div class="configs-box">
        <BaseForm />
    </div>
</template>

<script setup lang="ts" name="configs-button">
import { defineAsyncComponent} from 'vue';

const BaseForm = defineAsyncComponent(() => import('@c/base/index.vue'))

</script>
<style scoped lang="less">

</style>