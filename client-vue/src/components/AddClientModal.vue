<template>
    <div :class="{ hidden: !isOpen, fixed: isOpen }"
        class="inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-xl p-8 m-4 min-w-modal max-h-full text-left">
            <div class="flex justify-between items-center">
                <h4 class="text-lg font-bold">Add Client Modal</h4>
                <button type="button" class="text-black" @click="toggleModal">
                    &times;
                </button>
            </div>
            <div class="mt-4">
                <div class="container mx-auto p-4">
                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <input type="text" id="name" name="name" placeholder="Your name" v-model="formData.name"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input type="email" id="email" name="email" placeholder="you@example.com" v-model="formData.email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                            Phone Number:
                        </label>
                        <input type="tel" id="phone" name="phone" placeholder="123-456-7890" v-model="formData.phone"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
import { defineComponent, ref } from 'vue';


export default defineComponent({
    props: {
        isOpen: Boolean,
        toggleModal: Function,
        onSubmit: Function,
    },
    setup(props) {
        const formData = ref({
            name: "",
            email: "",
            phone: "",
        });

        const handleSubmit = () => {
            //@ts-ignore
            props.onSubmit(formData);
           
        };

        return { formData, handleSubmit };
    },
});
</script>


  