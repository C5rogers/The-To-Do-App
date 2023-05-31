<script setup>
import HeaderTwo from '../components/HeaderTwo.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'



const route=useRoute()

const userId=route.params.id

const name=ref("Natiman")






// const name=ref('Natiman')


const handleAddTask=()=>{
    
}
</script>

<template>
    <HeaderTwo :name="name"/>
    <main class="w-full py-5 px-10 min-h-screen relative">
        <!-- the whole container -->
        <div class="flex flex-col gap-5 w-full h-full">
            <!-- the header one -->
            <div class="w-full flex justify-between mt-3">
                <!-- the search one -->
                <div>
                    <form @submit.prevent="handleSearchSubmission">
                        <div class="relative">
                            <i class="fa-solid fa-search absolute top-3 left-2 text-gray-500 z-5"></i>
                            <input type="text" placeholder="Search User..." class="pl-8 pr-2 py-2 outline-none rounded-full border border-gray-300 shadow-sm focus:bg-gray-100 font-Roboto">
                        </div>
                    </form>
                </div>
                <!-- the task creater -->
                <div>
                    <form @submit.prevent="handleAddTask">
                        <div class="flex gap-3 items-center">
                            <!-- the input -->
                            <div class="relative">
                                <i class="fa fa-briefcase absolute text-sm top-2 left-2 text-gray-500"></i>
                                <input type="text" name="task" placeholder="Add Task For The user" class="w-full outline-none border border-gray-300 pl-7 rounded-full py-1 pr-2 font-Roboto focus:bg-gray-100">
                            </div>
                            <div>
                                <button class="p-2 border border-gray-300 flex items-center justify-center rounded-md transition duration-200  ease-in-out hover:bg-black hover:text-white"><i class="fa-solid fa-add"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>