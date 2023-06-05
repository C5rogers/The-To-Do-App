<script setup>
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from 'vue';
import getAllUsersTask from '../querys/getAllUsersTask.gql'

const props=defineProps({
    taskId:Number,
    taskMessage:String,
    userId:Number
})

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
`,{
    refetchQueries:[{query:getAllUsersTask,variables:{id:props.userId}}]
})


const showLoading=ref(false)

const errorMessage=ref('')


const editTask=ref(props.taskMessage)
const emit=defineEmits(['exit-edit-page'])




const handleTaskEdit=async()=>{
    if(editTask.value.length==0){
        errorMessage.value='Please Fill The Task!'
        setTimeout(() => {
            errorMessage.value=''
        }, 4000);
    }else{
        showLoading.value=true
        document.getElementById("EditButton").classList.add('cursor-not-allowed')
        const taskId=props.taskId
        const newTask=editTask.value
        await updateTask({
            id:taskId,
            task:newTask
        })
        showLoading.value=false
        document.getElementById("EditButton").classList.remove('cursor-not-allowed')
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
                            <button id="EditButton" class=" outline-none w-64 border border-gray-700 text-center rounded-full py-1 px-2 text-white font-bold font-Roboto bg-black cursor-pointer">
                                <span v-if="showLoading" class="w-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g><circle cx="12" cy="3" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate0" attributeName="r" begin="0;svgSpinners12DotsScaleRotate2.end-0.5s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="16.5" cy="4.21" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate1" attributeName="r" begin="svgSpinners12DotsScaleRotate0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="7.5" cy="4.21" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate2" attributeName="r" begin="svgSpinners12DotsScaleRotate4.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="19.79" cy="7.5" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate3" attributeName="r" begin="svgSpinners12DotsScaleRotate1.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="4.21" cy="7.5" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate4" attributeName="r" begin="svgSpinners12DotsScaleRotate6.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="21" cy="12" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate5" attributeName="r" begin="svgSpinners12DotsScaleRotate3.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="3" cy="12" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate6" attributeName="r" begin="svgSpinners12DotsScaleRotate8.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="19.79" cy="16.5" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate7" attributeName="r" begin="svgSpinners12DotsScaleRotate5.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="4.21" cy="16.5" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate8" attributeName="r" begin="svgSpinners12DotsScaleRotatea.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="16.5" cy="19.79" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate9" attributeName="r" begin="svgSpinners12DotsScaleRotate7.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="7.5" cy="19.79" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotatea" attributeName="r" begin="svgSpinners12DotsScaleRotateb.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="12" cy="21" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotateb" attributeName="r" begin="svgSpinners12DotsScaleRotate9.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><animateTransform attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="360 12 12;0 12 12"/></g></svg></span>
                                <span v-else>Edit</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>