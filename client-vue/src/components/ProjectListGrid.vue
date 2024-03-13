<template>
    <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-12">
        <div v-for="(item, index) in projects" :key="index">
            <ProjectCard :name="item.name" :image="item.image" :status="item.status" :description="item.description"
                :isAdded="projectListStore.checkIfAdded(item.id)" :id="item.id" @click-parent="handleProjectClick(item)" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProjectCard from './ProjectCard.vue';
import { useProjectListStore } from '@/store';

export interface IProject {
    image?: string;
    id: string;
    clientId: string;
    name: string;
    description: string;
    status: string;
    client: {
        id: string;
        name: string;
        email: string;
        phone: string
    }
}




export default defineComponent({
    name: "ProjectListGrid",
    components: {
        ProjectCard
    },
    props: {
        projects: {
            type: Array as () => IProject[],
        }
    },
    setup() {
        const projectListStore = useProjectListStore()
        const handleProjectClick = (item: IProject) => {
            if (projectListStore.checkIfAdded(item.id)) {
                projectListStore.deleteProjectFromCancellationList(item.id, item.name);
            } else {
                projectListStore.addProjectToCancel(item);
            }
        };
        return { projectListStore, handleProjectClick }

    }




})

</script>