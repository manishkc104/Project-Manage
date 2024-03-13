<template>
    <div className="bg-gray-800 rounded-lg shadow-lg relative">
        <div className="h-52 w-full relative">
            <img className="w-full h-full object-cover" :src="image" alt="Card" />
            <div className="absolute top-2 right-2">
                <TagView :text="status" />
            </div>
            <div className="absolute bottom-2 right-2">
                <div class="absolute bottom-2 right-2">
                    <AddCancellationListButton :id="id" :isAdded="isAdded" @click-child="handleButtonClick" />
                </div>
            </div>
        </div>
        <div className="p-4 flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-white text-xl font-semibold">{{ name }}</h3>
                <a href={} className="bg-teal-500 hover:bg-teal-700 text-white font-semi-bold py-1 px-2 rounded">
                    View
                </a>
            </div>
            <p className="text-gray-400 text-base">
                {{ shortenTheDescription(description || "", 70) }}
            </p>
        </div>
    </div>
</template>


<script lang="ts">
import { SetupContext, defineComponent } from 'vue';
import TagView from './TagView.vue';
import AddCancellationListButton from './AddCancellationListButton.vue';

export default defineComponent({
    name: "ProjectCard",
    components: {
        TagView,
        AddCancellationListButton
    },
    props: {
        name: String,
        status: String,
        image: String,
        description: String,
        isAdded: Boolean,
        id: String,
    },

    setup(props: any, context: SetupContext) {        
        const shortenTheDescription = (text: string, textLength: number) => {
            if (text.length <= textLength) {
                return text;
            }
            return text.substring(0, textLength) + "...";
        }

        const handleButtonClick = () => {
           context.emit("click-parent")
        };
        return { shortenTheDescription, handleButtonClick }


    }
})
</script>