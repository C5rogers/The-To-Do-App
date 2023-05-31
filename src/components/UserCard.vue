<script setup>

const props=defineProps({
    user:Object
})

</script>

<template>
    <!-- the upper -->
    <div class="w-full h-40 flex flex-col items-center justify-center gap-0">
        <!-- the image -->
        <div class="image-holder"><i class="fa-solid fa-user-circle text-4xl text-gray-900"></i></div>
        <!-- the user name -->
        <div class="flex items-center justify-center font-Roboto capitalize">{{ user.firstname }}</div>
    </div>
    <!-- the lower -->
    <div class="w-full flex justify-end ">
        <ul class="flex gap-2 items-center">
            <li>
                <button><i class="fa-solid fa-pen-nib text-xs"></i></button>
            </li>
            <li>
                <button><i class="fa-solid fa-trash-can text-xs"></i></button>
            </li>
        </ul>
    </div>
</template>