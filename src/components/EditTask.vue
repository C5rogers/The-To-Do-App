<script setup>
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from 'vue';


const {mutate:updateTask}=useMutation(gql`
    mutation updateTask($id:Int!,$task:String!){
        update_todos_by_pk(pk_columns:{id:$id},_set:{task:$task}){
            done
            task
            user{
                firstname
                id
            }
        }
    }
`)


const errorMessage=ref('')
const props=defineProps({
    taskId:Number,
    taskMessage:String
})

const editTask=ref(props.taskMessage)
const emit=defineEmits(['exit-edit-page'])




const handleTaskEdit=async()=>{
    if(editTask.value.length==0){
        errorMessage.value='Please Fill The Task!'
        setTimeout(() => {
            errorMessage.value=''
        }, 4000);
    }else{
        const taskId=props.taskId
        const newTask=editTask.value
        await updateTask({
            id:taskId,
            task:newTask
        })
        errorMessage.value=''
        editTask.value=''
        emitClose()
    }
}


const emitClose=()=>{
    errorMessage.value=''
    emit('exit-edit-page')
}

</script>
<template>

    <!-- the whole container -->
    <div class="fixed top-0 bottom-0 left-0 right-0 z-20 bg-gray-200 bg-opacity-50 flex items-center justify-center ">
        <!-- the container -->
        <div class="bg-white opacity-100 w-80 sm:w-1/2 md:w-1/3 rounded-sm shadow-lg py-3 px-5 relative">
            <!-- the title bar -->
            <div class="w-full border-b border-gray-300 flex items-center justify-between px-2 py-1">
                <!-- the title -->
                <div class="text-gray-900 font-bold font-Roboto text-xs">
                    Edit Task
                </div>
                <!-- the exit button -->
                <div class="absolute -right-5 -top-5 text-2xl cursor-pointer" @click="emitClose">
                    <i class="fa-solid fa-times text-black"></i>
                </div>
            </div>

            <!-- the body part -->
            <div class="flex items-center justify-center px-3 py-5">
                <!-- sub body -->
                <div class="flex flex-col items-center justify-center">
                    <!-- the image -->
                    <div class="image-holder">
                        <i class="fa fa-briefcase text-4xl text-gray-900"></i>
                    </div>
                    <!-- the form -->
                    <form @submit.prevent="handleTaskEdit" class="flex flex-col gap-3 py-4">
                        <label class="font-Roboto text-xs font-bold">Task:</label>
                        <div class="relative font-Roboto">
                            <i class="fa fa-briefcase absolute top-2 left-2 text-gray-500" ></i>
                            <input type="text" name="task" placeholder="User Task" class="outline-none w-64 border border-gray-700 rounded-full pl-7 pr-2 py-1" v-model="editTask"  >
                            <div class="text-xs text-red-400 font-Roboto px-3" v-if="errorMessage">
                                <p>{{ errorMessage }}</p>
                            </div>
                        </div>
                        <div>
                            <input type="submit" name="edit" value="Edit" class="outline-none w-64 border border-gray-700 text-center rounded-full py-1 px-2 text-white font-bold font-Roboto bg-black cursor-pointer">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>