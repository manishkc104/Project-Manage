<template>
   <div v-if="isOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <form @submit.prevent="handleSubmit"
         class="bg-white rounded-lg shadow-xl p-8 m-4 min-w-modal max-h-full text-left overflow-auto"
         :style="{ maxHeight: '80%' }">
         <div class="flex justify-between items-center">
            <h4 class="text-lg font-bold">Add Project Modal</h4>
            <button class="text-black" type="button" @click="toggleModal">
               &times;
            </button>
         </div>

         <div class="mt-4">
            <div class="container mx-auto p-4">
               <!-- Client Selection -->
               <div class="mb-4">
                  <label for="clientId" class="block text-gray-700 text-sm font-bold mb-2">
                     Client:
                  </label>
                  <select id="clientId" name="clientId" v-model="formData.clientId"
                     class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                     <option value=""></option>
                     <option v-for="client in clientData" :key="client.id" :value="client.id">
                        {{ client.name }}
                     </option>
                  </select>
               </div>

               <div class="mb-4">
                  <label htmlFor="name" class="block text-gray-700 text-sm font-bold mb-2">
                     Project Name:
                  </label>
                  <input type="text" id="name" name="name" v-model="formData.name" placeholder="Enter name"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
               </div>

               <div class="mb-4">
                  <label htmlFor="description" class="block text-gray-700 text-sm font-bold mb-2">
                     Description:
                  </label>
                  <textarea id="description" name="description" v-model="formData.description"
                     placeholder="Enter description"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
               </div>

               <div class="mb-4">
                  <label htmlFor="status" class="block text-gray-700 text-sm font-bold mb-2">
                     Status:
                  </label>
                  <select id="status" name="status" v-model="formData.status"
                     class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                     <option value="new">Not Started</option>
                     <option value="progress">In Progress</option>
                     <option value="completed">Completed</option>
                  </select>
               </div>

               <div class="mb-4">
                  <label for="image" class="block text-gray-700 text-sm font-bold mb-2">
                     Image:
                  </label>
                  <div class="border-2 border-dashed border-gray-400 p-2 rounded-lg">
                     <div v-bind="getRootProps()">
                        <input v-bind="getInputProps()" />
                        <p v-if="isDragActive">Drop the files here ...</p>
                        <p v-else>Drag 'n' drop some files here, or click to select files</p>
                     </div>
                     <button @click="open">open</button>
                  </div>
               </div>
            </div>
         </div>

         <div class="mt-4 flex justify-end">
            <button type="submit"
               class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none mr-4">
               Add
            </button>
            <button type="button" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
               @click="toggleModal">
               Close
            </button>
         </div>
      </form>
   </div>
</template>

<script lang="ts">
import { GET_CLIENTS } from '@/queries/clientQueries';
import { useQuery } from '@vue/apollo-composable';
import { defineComponent, ref, watchEffect } from 'vue';
import { useDropzone } from "vue3-dropzone"

interface Client {
   name: string,
   email: string,
   phone: string,
   id: string
}

export default defineComponent({
   name: "AddProjectModal",
   components: {
   },
   props: {
      isOpen: Boolean,
      toggleModal: Function,
      onSubmit: Function
   },

   setup(props) {
      const { loading, result } = useQuery(GET_CLIENTS);

      let clients = ref<Client[]>([])

      watchEffect(() => {
         if (result.value || !loading) {
            clients.value = result.value.clients;
         }
      });

      const formData = ref({
         clientId: '',
         name: '',
         description: '',
         status: '',
         // other fields...
      });
      function onDrop(acceptFiles: any, rejectReasons: any) {
         console.log(acceptFiles);
         console.log(rejectReasons);
      }
      const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

      const handleSubmit = () => {
         //@ts-ignore
         props.onSubmit(formData)
      }

      return {
         getRootProps,
         handleSubmit,
         formData,
         getInputProps,
         clientData: clients,
         ...rest,
      };
   }
})

</script>