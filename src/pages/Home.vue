<script setup>
import HeaderOne from '../components/HeaderOne.vue';
import CreateUser from '../components/CreateUser.vue';
import { ref } from 'vue';

const showCreateUser=ref(false)

const toogleCreateUser=()=>{
    showCreateUser.value=!showCreateUser.value
}

</script>

<template>
    <HeaderOne/>
    <CreateUser/>
    <main class="w-full py-5 px-10 min-h-screen">
        <div class="flex flex-col gap-10 mt-5 mb-5">
            <!-- the searching engine -->
            <div>
                <form @submit.prevent="handleSearchSubmission">
                    <div class="relative">
                        <i class="fa-solid fa-search absolute top-3 left-2 text-gray-500 z-5"></i>
                        <input type="text" placeholder="Search User..." class="pl-8 pr-2 py-2 outline-none rounded-full border border-gray-300 shadow-sm focus:bg-gray-100 font-Roboto">
                    </div>
                </form>
            </div>
            <!-- the grid view -->
            <div class="w-full flex flex-col px-5 ">
                <!-- the add button -->
                <div class="w-60 h-60 flex items-center justify-center bg-gray-100 border-gray-200 rounded-lg cursor-pointer transition transform hover:scale-105 hover:shadow-lg duration-200">
                    <div>
                        <!-- the image -->
                        <div class="image-holder" @click="toogleCreateUser"><i class="fa-solid fa-add text-2xl font-light text-gray-600"></i></div>
                        <div class="font-light text-gray-500 text-sm pt-1 flex items-center justify-center">ADD NEW</div>
                    </div>
                </div>
                <!--the grid container -->
                <div>
                    <!-- sub elements with user information -->
                </div>
            </div>
        </div>
    </main>
</template>