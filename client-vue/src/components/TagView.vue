<template>
    <div :class="getClassName()">
        {{ text }}
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "TagView",
    props: {
        text: String
    },
    methods: {
        getClassName() {
            switch (this.text) {
                case 'Not Started':
                    return 'bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded dark:bg-blue-700 dark:text-gray-300 w-fit uppercase font-semibold';
                case 'In Progress':
                    return 'bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded dark:bg-yellow-700 dark:text-gray-300 w-fit uppercase font-semibold';
                case 'Completed':
                    return 'bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-gray-300 w-fit uppercase font-semibold';
                default:
                    return '';
            }
        },
    }

})
</script>