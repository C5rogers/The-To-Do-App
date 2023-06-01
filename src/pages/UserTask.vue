<script setup>
import HeaderTwo from '../components/HeaderTwo.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery,useMutation,useSubscription } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import TaskCard from '../components/TaskCard.vue'
import ErrorPopup from '../components/ErrorPopup.vue';


const showErrorPopup=ref(false)
const errorMessage=ref('')


const task=ref('')
const search=ref('')
const route=useRoute()

const userId=route.params.id

const {result,loading,error}=useSubscription(gql`
    query getUser($id:Int!){
            users_by_pk(id:$id){
            firstname
            id
            todos{
                task
                done
                id
                }
            }
        }
`,()=>({
    id:userId
}))

const {mutate:createTask}=useMutation(gql`
    mutation addTask($task:String!,$user_id:Int!,$done:Boolean!){
    insert_todos(objects:[{user_id:$user_id,done:$done,task:$task}]){
        returning{
        id
        task
        done
        }
    }
    }
`)

const {mutate:updateTask}=useMutation(gql`
    mutation updateTask($id:Int!,$done:Boolean!) {
        update_todos_by_pk(pk_columns: {id: $id}, _set: {done: $done}) {
            done
            task
            user{
            firstname
            id
            }
        }
    }
`)



const updateTaskDone=(taskId,taskDone)=>{
   const newTaskDone=!taskDone
   updateTask({
        id:taskId,
        done:newTaskDone
    })
}



const handleAddTask=()=>{
    if(task.value.length==0){
        errorMessage.value="pleas fill the task first!"
        showErrorPopup.value=!showErrorPopup.value
        setTimeout(()=>{showErrorPopup.value=!showErrorPopup.value},4000)
    }else{
        createTask({
            user_id:userId,
            done:false,
            task:task.value
        })
        task.value=''
    }
}
</script>

<template>
    <HeaderTwo :name="result && result.users_by_pk.firstname"/>
    <Transition name="popup">
        <ErrorPopup :message="errorMessage" v-if="showErrorPopup"/>
    </Transition>
    <main class="w-full py-5 px-10 min-h-screen relative">
        
        <!-- the whole container -->
        <div class="flex flex-col gap-5 w-full h-full">
            <!-- the header one -->
            <div class="w-full flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between mt-3">
                <!-- the search one -->
                <div>
                    <form @submit.prevent="handleSearchSubmission">
                        <div class="relative">
                            <i class="fa-solid fa-search absolute top-3 left-2 text-gray-500 z-5"></i>
                            <input type="text" placeholder="Search User..." class="pl-8 pr-2 py-2 outline-none rounded-full border border-gray-300 shadow-sm focus:bg-gray-100 font-Roboto" v-model="search">
                        </div>
                    </form>
                </div>
                <!-- the task creater -->
                <div>
                    <form @submit.prevent="handleAddTask">
                        <div class="flex gap-3 items-center">
                            <!-- the input -->
                            <div class="relative">
                                <i class="fa fa-briefcase absolute text-sm top-3 left-2 text-gray-500"></i>
                                <input type="text" name="task" placeholder="Add Task For The user" class="w-full outline-none border border-gray-300 pl-7 rounded-full py-2 pr-2 font-Roboto focus:bg-gray-100" v-model="task">
                            </div>
                            <div>
                                <button class="p-2 border border-gray-300 flex items-center justify-center rounded-md transition duration-200  ease-in-out hover:bg-black hover:text-white"><i class="fa-solid fa-add"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

                <!-- the loading animation -->
            <div v-if="loading" class="w-full flex items-center justify-center h-96">
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><circle cx="4" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsBounce0" attributeName="cy" begin="0;svgSpinners3DotsBounce1.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle><circle cx="12" cy="12" r="3" fill="currentColor"><animate attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle><circle cx="20" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsBounce1" attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle></svg>
            </div>

            <!-- the grid view -->
            <div class="my-5 grid  sm:grid-cols-2 md:grid-cols-4 gap-5" v-else>
                <!-- the grid childs -->
                <div v-for="(task,index) in result && result.users_by_pk.todos" :key="index" class="w-full relative h-52 border border-gray-200 bg-gray-50 rounded-md flex flex-col items-center justify-center cursor-pointer transition transform duration-200 hover:scale-105 hover:shadow-lg " @dblclick="updateTaskDone(task.id,task.done)">
                    <TaskCard :Task="task"/>
                </div>
            </div>
        </div>
    </main>
</template>