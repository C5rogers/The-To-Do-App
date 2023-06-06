<script setup>

</script>
<template>
    <div class="container  w-full min-h-screen bg-gray-50 flex justify-center items-center ">
        <!-- the message container -->
        <div class="m-7 shadow-md bg-white flex flex-col  gap-5">
            <!-- the image -->
            <div class="flex w-60 justify-center items-center">
                <img src="/images/pageNotFound.png" alt="">
            </div>
            <!-- the button -->
            <div class="w-full flex justify-center items-center py-2 px-4 bg-green-500 text-white rounded-sm font-Roboto font-bold">
                <router-link :to="{name:'home'}">Go To Home...</router-link>
            </div>
        </div>
    </div>
</template>