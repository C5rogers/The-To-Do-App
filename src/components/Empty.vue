<script setup>
const props=defineProps({
    message:String
})

</script>

<template>
   <!-- the empty container -->
   <div class="container h-72 mt-10 bg-gray-50 flex flex-col gap-5 items-center justify-center">
    <!-- the image -->
        <div class="flex w-60 justify-center items-center">
            <img src="../images/empty.png" class="w-full" alt="">
        </div>
        <!-- the message -->
        <div class="font-Roboto font-bold text-gray-500">
            <p>{{ message }}</p>
        </div>
   </div>
</template>