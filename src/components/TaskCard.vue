<script setup>
const props=defineProps({
    Task:Object
})

const emit=defineEmits(['delete-todo','edit-todo'])


const emitEdit=(id,task)=>{
    emit('edit-todo',{
        id,
        task
    })
}

const emitDelete=(id)=>{
    emit('delete-todo',{
        id
    })
}

</script>

<template>
    <!-- the absolute -->
    <div class="absolute top-2 right-2 text-xs">
        <i class="fa-solid fa-check text-green-600 text-sm" v-if="Task.done"></i>
        <i class="fa-solid fa-clock-rotate-left" v-else></i>
    </div>

    <!-- the image and the task -->
    <div class="flex flex-col items-center justify-center h-40 ">
        <!-- the image -->
        <div class="image-holder">
            <i class="fa fa-briefcase text-4xl text-gray-900"></i>
        </div>

        <!-- the task -->
        <div>
            <p class="text-xs text-center max-w-1xl font-Roboto text-gray-700">{{ Task.task }}</p>
        </div>
    </div>

    <!-- the bottom one -->
    <div class="w-full flex justify-end items-center">
        <ul class="flex gap-2 items-center pr-2">
            <li>
                <button @click="emitEdit(Task.id,Task.task)"><i class="fa-solid fa-pen-nib text-xs"></i></button>
            </li>
            <li>
                <button @click="emitDelete(Task.id)"><i class="fa-solid fa-trash-can text-xs"></i></button>
            </li>
        </ul>
    </div>

</template>