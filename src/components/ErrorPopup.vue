<script setup>
const props=defineProps({
    message:String
})

</script>

<template>
    <!-- the popup -->
    <div class="flex items-center justify-center left-1/3 fixed top-20 bg-red-600 p-5 rounded-lg z-20 w-80 text-white font-Roboto capitalize shadow-lg">
        <p>{{ message }}</p>
    </div>

</template>
