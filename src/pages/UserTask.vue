<script setup>
import HeaderTwo from '../components/HeaderTwo.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery,useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import TaskCard from '../components/TaskCard.vue'
import ErrorPopup from '../components/ErrorPopup.vue';
import ConfirmDelete from '../components/ConfirmDelete.vue';
import EditTask from '../components/EditTask.vue';
import getAllUsersTask from '../querys/getAllUsersTask.gql'
import EmptyVue from '../components/Empty.vue'


const forEmpty=ref('Opps There Is No Task Given For This User Yet!')
const forEditTask=ref({
    id:'',
    task:'',
    userId:''
})
const forDeleteConfirmation=ref({
    title:'',
    message:'',
    to:''
})

const showEditTask=ref(false)
const showDeleteConfirmation=ref(false)

const showErrorPopup=ref(false)
const errorMessage=ref('')


const task=ref('')
const route=useRoute()

const userId=route.params.id

const {result,loading,error}=useQuery(getAllUsersTask,()=>({
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
`,{
    refetchQueries:[{query:getAllUsersTask,variables:{id:userId}}]
})

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
`,{
    refetchQueries:[{query:getAllUsersTask,variables:{id:userId}}]
})

const {mutate:deleteTask}=useMutation(gql`
    mutation deleteTask($id:Int!){
        delete_todos_by_pk(id:$id){
            id
        }
    }
`,{
    refetchQueries:[{query:getAllUsersTask,variables:{id:userId}}]
})



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

const handleEditTodo=(result)=>{
    forEditTask.value.id=result.id
    forEditTask.value.userId=parseInt(userId)
    forEditTask.value.task=result.task
    showEditTask.value=true
}
const handleDeleteTodo=(result)=>{
    forDeleteConfirmation.value.title="Deleting Todo"
    forDeleteConfirmation.value.message="Are You Shure To Delete Todo With The Id Of"+result.id+" ?"
    forDeleteConfirmation.value.to=result.id
    showDeleteConfirmation.value=true
}

const handleConfirmationResult=(result)=>{
    showDeleteConfirmation.value=false
    const todoId=parseInt(result.userId)
    if(result.isConfirmed==true){
        deleteTask({
            id:todoId
        })
    }
}


const handleExitEdit=()=>{
    showEditTask.value=false
}

const value=ref('')
const vFocus={
    mounted:(el)=>el.focus()
}

</script>

<template>
    <HeaderTwo :name="result && result.users_by_pk.firstname"/>
    <Transition name="fade">
        <EditTask :task-id="forEditTask.id" :task-message="forEditTask.task" :user-id="forEditTask.userId" @exit-edit-page="handleExitEdit" v-if="showEditTask"/>
    </Transition>
    <Transition name="fade">
        <ConfirmDelete :title="forDeleteConfirmation.title" :message="forDeleteConfirmation.message" :delete-who="forDeleteConfirmation.to" v-if="showDeleteConfirmation" @confirmation-result="handleConfirmationResult"/>
    </Transition>
    <Transition name="popup">
        <ErrorPopup :message="errorMessage" v-if="showErrorPopup"/>
    </Transition>
    <main class="w-full py-5 px-10 min-h-screen relative">
        
        <!-- the whole container -->
        <div class="flex flex-col gap-5 w-full h-full">
            <!-- the header one -->
            <div class="w-full flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between mt-3">
                <!-- the task creater -->
                <div>
                    <form @submit.prevent="handleAddTask">
                        <div class="flex gap-3 items-center">
                            <!-- the input -->
                            <div>
                                <button class="p-2 border border-gray-300 flex items-center justify-center rounded-md transition duration-200  ease-in-out hover:bg-black hover:text-white"><i class="fa-solid fa-add"></i></button>
                            </div>
                            <div class="relative">
                                <i class="fa fa-briefcase absolute text-sm top-3 left-2 text-gray-500"></i>
                                <input type="text" v-focus name="task" placeholder="Add Task For The user" class="w-full outline-none border border-gray-300 pl-7 rounded-full py-2 pr-2 font-Roboto focus:bg-gray-100" v-model="task">
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
            <TransitionGroup tag="div" class="my-5 grid  sm:grid-cols-2 md:grid-cols-4 gap-5" name="cards"  v-else-if="result.users_by_pk.todos.length>0">
                 <!-- the grid childs -->
                 <div v-for="(task,index) in result && result.users_by_pk.todos" :key="index" class="w-full relative h-52 border border-gray-200 bg-gray-50 rounded-md flex flex-col items-center justify-center cursor-pointer transition transform duration-200 hover:scale-105 hover:shadow-lg " @dblclick="updateTaskDone(task.id,task.done)">
                    <TaskCard :Task="task" @edit-todo="handleEditTodo" @delete-todo="handleDeleteTodo" />
                </div>
            </TransitionGroup>

            <!-- the empty vuew -->
            <Transition name="cards" v-else>
                <div  class="w-full h-full container m-auto flex  items-center justify-center gap-5">
                    <EmptyVue :message="forEmpty"/>
                </div>
            </Transition>
            
        </div>
    </main>
</template>