<script setup>
import { useQuery,useSubscription,useMutation } from '@vue/apollo-composable'
import ConfirmDelete from '../components/ConfirmDelete.vue';
import HeaderOne from '../components/HeaderOne.vue';
import UserCard from '../components/UserCard.vue';
import CreateUser from '../components/CreateUser.vue';
import { ref } from 'vue';
import gql from 'graphql-tag'
import EditUser from '../components/EditUser.vue';
import getAllUser from '../querys/getAllUsers.gql'


const {result,loading}=useQuery(getAllUser)


const searchInput=ref('')


const {mutate:deleteTheUser}=useMutation(gql`
    mutation deleteUser($id:Int!) {
        delete_users_by_pk(id: $id) {
            id
        }
    }

`,{
    refetchQueries:[{query:getAllUser}]
})

const deleteConfirmationData=ref({
    title:'',
    message:"",
    to:''
})


const forEditUserPage=ref({
    id:'',
    username:''
})

const showUserEditPage=ref(false)
const showConfirmDeleteUser=ref(false)
const showCreateUser=ref(false)

const toogleCreateUser=()=>{
    showCreateUser.value=!showCreateUser.value
}

const handleCloseTheForm=()=>{
    showCreateUser.value=!showCreateUser.value
}

const handleDeleteUser=(result)=>{
    deleteConfirmationData.value.title="Deleting User"
    deleteConfirmationData.value.message="Are You Shure To Delete User With The Id Of "+result.userId+" ?"
    deleteConfirmationData.value.to=result.userId
    showConfirmDeleteUser.value=true
}
const handleEditUser=(result)=>{
    forEditUserPage.value.id=result.userId
    forEditUserPage.value.username=result.username
    showUserEditPage.value=true
   
}

const handleConfirmationResult=(result)=>{
    showConfirmDeleteUser.value=false
    if(result.isConfirmed==true){
        // now can send the delete user request to the server
        const userId= parseInt(result.userId)
        deleteTheUser({id:userId})
    }

}

const handleExitEditpage=()=>{
    showUserEditPage.value=false
}

// have som bug here

// const SearchUser=async()=>{
//     console.log(searchInput.value)
//     const {result,loading}=useQuery(gql`
//     query searchingUser($username:String!) {
//         users(where: {firstname: {_regex: $username}}){
//             id
//             firstname
//         }
//     }
//     `,()=>({
//         username:searchInput.value
//     }))
// }

</script>

<template>
    <HeaderOne/>

    <Transition name="fade">
        <EditUser :user-id="forEditUserPage.id" :user-name="forEditUserPage.username" @exit-edit-page="handleExitEditpage" v-if="showUserEditPage"/>
    </Transition>

    <Transition name="fade">
        <ConfirmDelete :title="deleteConfirmationData.title" :message="deleteConfirmationData.message" :delete-who="deleteConfirmationData.to" v-if="showConfirmDeleteUser" @confirmation-result="handleConfirmationResult"/>
    </Transition>

    <Transition name="fade">
        <CreateUser @close-the-form="handleCloseTheForm" v-if="showCreateUser"/>
    </Transition>
    <main class="w-full py-5 px-10 min-h-screen">
        <div class="flex flex-col gap-10 mt-5 mb-5">
            <!-- the searching engine -->
            <div>
                <form @submit.prevent="handleSearchSubmission">
                    <div class="relative">
                        <i class="fa-solid fa-search absolute top-3 left-2 text-gray-500 z-5"></i>
                        <input type="text" placeholder="Search User..." class="pl-8 pr-2 py-2 outline-none rounded-full border border-gray-300 shadow-sm focus:bg-gray-100 font-Roboto" v-model="searchInput" >
                    </div>
                </form>
            </div>
            <!-- the grid view -->

            <!-- the loading animation is here -->
            <div v-if="loading" class="w-full flex items-center justify-center h-96">
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><circle cx="4" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsBounce0" attributeName="cy" begin="0;svgSpinners3DotsBounce1.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle><circle cx="12" cy="12" r="3" fill="currentColor"><animate attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle><circle cx="20" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsBounce1" attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle></svg>
            </div>

            <div class="w-full flex flex-col px-5 " v-else>
                <!-- the add button -->
                <div class="w-60 h-60 flex items-center justify-center bg-gray-100 border-gray-200 rounded-lg cursor-pointer transition transform hover:scale-105 hover:shadow-lg duration-200">
                    <div>
                        <!-- the image -->
                        <div class="image-holder" @click="toogleCreateUser"><i class="fa-solid fa-add text-2xl font-light text-gray-600"></i></div>
                        <div class="font-light text-gray-500 text-sm pt-1 flex items-center justify-center">ADD NEW</div>
                    </div>
                </div>
                <!--the grid container -->
                <TransitionGroup name="cards" mode="move" tag="div" class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-5">
                    <!-- sub elements with user information -->
                    <div v-for="(user,index) in result && result.users" :key="index" class="w-full border flex flex-col items-center justify-center p-2 cursor-pointer h-52 transform transition duration-200 hover:shadow-lg hover:scale-105 rounded-sm bg-gray-50">
                        <UserCard :user="user" @delete-user="handleDeleteUser" @edit-user="handleEditUser"/>    
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </main>
</template>
