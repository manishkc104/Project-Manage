<template>
  <div>
    <button :class="buttonClasses" type="button" @click="emitClickEvent">
      <template v-if="isAdded">
        Remove From Cancellation List
      </template>
      <template v-else>
        <span class="mr-2">Add to Cancellation List</span>
      </template>
    </button>

  </div>
</template>
  
<script lang="ts">
import { SetupContext, computed } from 'vue';

export default {
  props: {
    onClick: Function,
    isAdded: Boolean,
    id: String
  },
  setup(props: any, context: SetupContext) {
    const buttonClasses = computed(() => {
      return [
        'text-white rounded-xl px-2 py-2 text-sm flex items-center justify-center focus:outline-none transition-colors',
        props.isAdded ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-green-500'
      ];
    });

    const emitClickEvent = () => {
      context.emit('click-child');
    };

    return {
      buttonClasses,
      emitClickEvent
    };
  }
};
</script>
  