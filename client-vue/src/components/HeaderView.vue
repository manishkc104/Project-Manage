<template>
<div>
    <meta-info :title="text"></meta-info>
    <h2 class="text-3xl font-bold text-gray-300 font-mono mt-4 mb-4 text-left">
      {{ text }}
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MetaInfo from 'vue-meta'

export default defineComponent({
    name: "HeaderView",
    components: {
        MetaInfo
    },
    props: {
        text: String
    }
})
</script>