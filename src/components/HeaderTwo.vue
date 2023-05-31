<script setup>
import { useRouter } from 'vue-router';

const router=useRouter()
const props=defineProps({
    name:String
})

const goBack=()=>{
    router.go(-1)
}
</script>

<template>
    <header class="w-full border-b px-10 py-3  sticky top-0 right-0 left-0 shadow-lg z-10 bg-white font-Roboto flex justify-between items-center">
        <div class="flex items-center gap-2">
            <div><i class="fa-solid fa-user-circle text-2xl"></i></div>
            <div>{{ name }}</div>
        </div>
        <div>
            <button id="button" @click="goBack" class="flex items-center bg-black text-white px-2 py-1 rounded-full gap-2 transition duration-200 hover:shadow-lg"><i class="fa-solid fa-arrow-left"></i><span>Back</span></button>
        </div>
    </header>
</template>

<style scoped>
    #button>i{
        transition: all ease-in-out .22s;
    }
    #button:hover>i{
        transform: translateX(-5px);
    }
</style>