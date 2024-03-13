<template>
  <div class="bg-gray-900 min-h-screen w-screen flex flex-col items-center">
    <section class="container flex flex-col h-full flex-1 p-4 md:p-0">
      <div class="flex justify-end mt-8">
        <button
          class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          @click="toggleModal"
        >
          Add New Project
        </button>
      </div>
      <HeaderView text="Projects" />
      <ProjectListGrid :projects="projects" />
    </section>
  </div>
  <AddProjectModal
    :isOpen="isModalOpen"
    :toggleModal="toggleModal"
    :onSubmit="onSubmit"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import HeaderView from "../components/HeaderView.vue";
import ProjectListGrid from "@/components/ProjectListGrid.vue";
import AddProjectModal from "@/components/AddProjectModal.vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { GET_PROJECTS } from "@/queries/projectQueries";
import { ADD_PROJECT } from "@/mutation/projectMutations";

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
    phone: string;
  };
}

export default defineComponent({
  name: "HomeView",
  components: {
    HeaderView,
    ProjectListGrid,
    AddProjectModal,
  },
  setup() {
    let projects = ref<IProject[]>();
    const isModalOpen = ref(false);
    const isDarkMode = ref(false);
    const { loading, result } = useQuery(GET_PROJECTS);
    const { mutate: addProject } = useMutation(ADD_PROJECT, {
      refetchQueries: [{ query: GET_PROJECTS }],
      awaitRefetchQueries: true,
    });

    watchEffect(() => {
      if (result.value) {
        projects.value = result.value.projects;
      }
    });

    const toggleModal = () => {
      isModalOpen.value = !isModalOpen.value;
    };

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
    };

    const onSubmit = (formData: any) => {
      const { name, clientId, description, status } = formData.value;
      addProject({
        name,
        clientId,
        description,
        status,
        image:
          "https://images.unsplash.com/photo-1683009427692-8a28348b0965?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }).then(() => {
        isModalOpen.value = !isModalOpen.value;
      });
    };

    return {
      toggleModal,
      isModalOpen,
      isDarkMode,
      onSubmit,
      projects,
      toggleDarkMode,
    };
  },
});
</script>
