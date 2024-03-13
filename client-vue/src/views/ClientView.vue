<template>
    <div class="bg-gray-900 min-h-screen w-screen flex flex-col items-center">
        <section class="container flex flex-col h-full flex-1 p-4 md:p-0">
            <div>
                <HeaderView text="        " />
                <div className="container mx-auto p-4">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone Number</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="(item, index) in clients" :key="index">
                                <td className="border px-4 py-2 text-white">{{ item.name }}</td>
                                <td className="border px-4 py-2 text-white">{{ item.email }}</td>
                                <td className="border px-4 py-2 text-white">{{ item.phone }}</td>
                                <td className="border px-4 py-2">
                                    <button type="button" @click="handleDelete(item.id)" className="bg-red-500 hover:bg-red-700
                                        text-white font-bold py-1 px-2 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <AddClientModal :isOpen="isModalOpen" :toggleModal="toggleModal" :onSubmit="onSubmit" />
            </div>
        </section>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import HeaderView from '@/components/HeaderView.vue';
import AddClientModal from '@/components/AddClientModal.vue';
import { useQuery, useMutation } from '@vue/apollo-composable'
import { GET_CLIENTS } from "../queries/clientQueries"
import { ADD_CLIENT, DELETE_CLIENT } from "../mutation/clientMutation"


interface Client {
    name: string,
    email: string,
    phone: string,
    id: string
}

interface IFormdata {
    value: {
        name: string,
        email: string,
        phone: string
    }
}

export default defineComponent({
    name: 'ClientView',
    components: {
        HeaderView,
        AddClientModal
    },
    setup() {
        let clients = ref<Client[]>()
        const isModalOpen = ref(false);
        const { loading, result } = useQuery(GET_CLIENTS);
        const { mutate: addClient } = useMutation(ADD_CLIENT, {
            refetchQueries: [
                { query: GET_CLIENTS }
            ],
            awaitRefetchQueries: true
        });
        const { mutate: deleteClient } = useMutation(DELETE_CLIENT, {
            refetchQueries: [
                { query: GET_CLIENTS }
            ],
            awaitRefetchQueries: true
        });

        watchEffect(() => {
            if (result.value) {
                clients.value = result.value.clients;
            }
        });

        const toggleModal = () => {
            isModalOpen.value = !isModalOpen.value
        }

        const handleDelete = (id: string) => {
            deleteClient({ id }).then(() => {
                console.log("deleted succcessfully")
            });
        }

        const onSubmit = (formData: IFormdata) => {
            const { name, email, phone } = formData.value;
            addClient({ name, email, phone }).then(() => {
                isModalOpen.value = !isModalOpen.value
            });
        };
        return { isModalOpen, toggleModal, handleDelete, onSubmit, clients, loading }
    },
});
</script>
  