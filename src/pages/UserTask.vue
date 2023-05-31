<script setup>
import HeaderTwo from '../components/HeaderTwo.vue';
import { ref } from 'vue';

const name=ref('Natiman')


const handleAddTask=()=>{
    
}
</script>

<template>
    <HeaderTwo :name="name"/>
    <main class="w-full py-5 px-10 min-h-screen relative">
        <!-- the whole container -->
        <div>
            <!-- the header one -->
            <div>
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
                    
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>