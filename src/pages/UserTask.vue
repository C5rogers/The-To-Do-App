<script setup>
import HeaderTwo from '../components/HeaderTwo.vue';
import { ref } from 'vue';

const name=ref('Natiman')

</script>

<template>
    <HeaderTwo :name="name"/>
    <main class="w-full py-5 px-10 min-h-screen relative">
        
    </main>
</template>