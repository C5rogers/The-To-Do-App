<script setup>
import { ref } from 'vue';

const confimed=ref(false)
const props=defineProps({
    message:String,
    title:String,
    deleteWho:Number
})

const handleConfirmation=(e)=>{
    e.preventDefault();
    console.log(e)
}
</script>

<template>
    <!-- the confirmation -->
    <div class="">
        <!-- the title -->
        <div>
            {{ title }}
        </div>
        <!-- the message -->
        <div>
            <p>{{ message }}</p>
        </div>
        <!-- the form -->
        <div>
            <form @submit="handleConfirmation">
                <div>
                    <input type="submit" name="yes" value="Yes">
                    <input type="submit" name="no" value="No">
                </div>
            </form>
        </div>
    </div>

</template>