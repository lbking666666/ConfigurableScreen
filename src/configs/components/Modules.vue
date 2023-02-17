<template>
	<div class="config-box">
       <BaseForm />
    </div>
</template>

<script setup lang="ts" name="config-modules">
import { defineAsyncComponent} from 'vue';

const BaseForm = defineAsyncComponent(() => import('@c/base/index.vue'))

</script>