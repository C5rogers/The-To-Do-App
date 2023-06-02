<script setup>
import { ref } from 'vue';

const confimed=ref(false)
const props=defineProps({
    message:String,
    title:String,
    deleteWho:Number
})



const emit=defineEmits(['confirmation-result'])

const handleConfirmation=(e)=>{
    e.preventDefault();
    if(e.submitter.name==='yes'){
        confimed.value=true
    }

    const isConfirmed=confimed.value
    const userId=props.deleteWho
        emit('confirmation-result',{
            userId,
            isConfirmed
        })
}
</script>

<template>
    <!-- the confirmation -->
    <div class="fixed top-0 left-0 right-0 bottom-0 z-10 bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <!-- the whole container -->
        <div class="flex flex-col font-Roboto w-fit p-5 gap-3 bg-red-700 text-white rounded-lg shadow-lg">
            <!-- the title -->
            <div class="text-2xl fotn-bold">
                {{ title }}
            </div>
            <!-- the message -->
            <div class="text-gray-100 font-light text-sm">
                <p>{{ message }}</p>
            </div>
            <!-- the form -->
            <div class="self-end mt-3">
                <form @submit="handleConfirmation">
                    <div class="flex gap-4">
                        <input type="submit" name="yes" value="Yes" class="cursor-pointer bg-black  px-2  rounded-sm">
                        <input type="submit" name="no" value="No" class="cursor-pointer bg-green-500 text-black px-2 rounded-sm">
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>