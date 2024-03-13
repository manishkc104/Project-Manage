import { IProject } from "@/interface/IProject";
import { defineStore } from "pinia"
import { computed, ref } from "vue";


export const useProjectListStore = defineStore("projectList", () => {
  const projectToCancel = ref<IProject[]>([]);

  const addProjectToCancel = (project: IProject) => {
    const isProjectAlreadyAdded = projectToCancel.value.some((cProject) => cProject.id === project.id)
    if (isProjectAlreadyAdded) return;
    projectToCancel.value.push(project)
  }

  const deleteProjectFromCancellationList = (id: IProject["id"], name: IProject["name"]) => {
    const isProjectAlreadyAdded = projectToCancel.value.some((cProject) => cProject.id === id);
    if (!isProjectAlreadyAdded) return;
    const hasConfirmed = confirm(`Are you sure you want to delete project number ${name} from the list`);
    if (!hasConfirmed) return;
    projectToCancel.value = projectToCancel.value.filter(p => p.id !== id)
  }

  const count = computed(() => projectToCancel.value.length);

  const checkIfAdded = (id: IProject["id"]) => {
    return projectToCancel.value.some((project) => project.id === id)
  }

  return { addProjectToCancel, deleteProjectFromCancellationList, count, checkIfAdded, projectToCancel }

})