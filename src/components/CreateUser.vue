<script setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const userName=ref('')


const getAllUser=gql`
query getUser {
  users {
    firstname
    id
  }
}
`

const errorMessage=ref('')

const emit=defineEmits(['close-the-form'])

const {mutate:createUser}=useMutation(gql`
        mutation insertUser($firstname:String!){
                insert_users(objects:[{firstname:$firstname}]){
                    returning{
                    firstname
                    id
                    }
                }
        }
`,
)


const handleSubmission=()=>{
    if(userName.value.length==0){
        errorMessage.value="please fill the user name"
        setTimeout(()=>{
            errorMessage.value=""
        },4000)
    }else{
        createUser({
            firstname:userName.value
        }
        // have some bug here
        // ,{
        //     update:(cache,{data:{createUser}})=>{
        //         let data=cache.readQuery({query:getAllUser})
        //         data={
        //             ...data,
        //             users:[
        //                 ...data.users,
        //                 createUser
        //             ]
        //         }
        //         cache.writeQuery({ query: getAllUser, data })
        //     }
        )   
        userName.value=''
        emit('close-the-form')     
    }
}
const emitClose=()=>{
    userName.value=''
    emit('close-the-form')
}

</script>

<template>
            <div class="fixed top-0 bottom-0 left-0 right-0 z-20 bg-gray-200 bg-opacity-50 flex items-center justify-center ">
                <!-- the container -->
                    <div class="bg-white opacity-100 w-80 sm:w-1/2 md:w-1/3 rounded-sm shadow-lg py-3 px-5 relative">
                        <!-- the title bar -->
                        <div class="w-full border-b border-gray-300 flex items-center justify-between px-2 py-1">
                            <!-- the title -->
                            <div class="text-gray-900 font-bold font-Roboto text-xs">
                                Creating User
                            </div>
                            <!-- the exit -->
                            <div class="absolute -right-5 -top-5 text-2xl cursor-pointer" @click="emitClose"><i class="fa-solid fa-times text-black"></i></div>
                        </div>
                        <!-- the body part -->
                        <div class="flex items-center justify-center px-3 py-5">
                            <!-- sub body -->
                            <div class="flex flex-col items-center justify-center">
                                <!-- the image -->
                                <div class="image-holder">
                                    <i class="fa-solid fa-user-circle text-5xl text-black"></i>
                                </div>

                                <!-- the form -->
                                <form @submit.prevent="handleSubmission" class="flex flex-col gap-3 py-4">
                                    <label class="font-Roboto text-xs font-bold">User Name:</label>
                                    <div class="relative font-Roboto">
                                        <i class="fa-solid fa-user-circle absolute top-2 left-2 text-gray-500" ></i>
                                        <input type="text" name="username" placeholder="User Name" class="outline-none w-64 border border-gray-700 rounded-full pl-7 pr-2 py-1" v-model="userName" >
                                        <div class="text-xs text-red-400 font-Roboto px-3" v-if="errorMessage">
                                            <p>{{ errorMessage }}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="submit" name="create" value="Create" class="outline-none w-64 border border-gray-700 text-center rounded-full py-1 px-2 text-white font-bold font-Roboto bg-black cursor-pointer">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
</template>