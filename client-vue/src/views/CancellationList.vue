<template>
    <div class="bg-gray-900 min-h-screen w-screen flex flex-col items-center">
        <section class="container flex flex-col h-full flex-1 p-4 md:p-0">
            <div className="flex flex-1 flex-col flex-center">
                <HeaderView text="Cancellation List" />
                <ProjectListGrid :projects="projectListStore.projectToCancel" />
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderView from '@/components/HeaderView.vue';
import ProjectListGrid from '@/components/ProjectListGrid.vue';
import { useProjectListStore } from '@/store';

export default defineComponent({
    name: "CancellationListView",
    components: {
        HeaderView,
        ProjectListGrid
    },
    setup() {
        const projectListStore = useProjectListStore()
        return {projectListStore}
    }
})
</script>