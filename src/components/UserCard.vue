<script setup>

const props=defineProps({
    user:Object
})


const emit=defineEmits(['delete-user','edit-user'])


const editUser=(userId,username)=>{
    emit('edit-user',{
        userId,
        username
    })
}
const deleteUser=(userId)=>{
    emit('delete-user',{
        userId
    })
}

</script>

<template>
    <!-- the upper -->
    <router-link :to="{name:'UserTasks',params:{id:user.id}}" class="w-full" >
        <div class="w-full h-40 flex flex-col items-center justify-center gap-0">
        <!-- the image -->
        <div class="image-holder"><i class="fa-solid fa-user-circle text-4xl text-gray-900"></i></div>
        <!-- the user name -->
        <div class="flex items-center justify-center font-Roboto capitalize">{{ user.firstname }}</div>
    </div>
    </router-link>
   
    <!-- the lower -->
    <div class="w-full flex justify-end items-center">
        <ul class="flex gap-2 items-center">
            <li>
                <button class="z-10" @click="editUser(user.id,user.firstname)"><i class="fa-solid fa-pen-nib text-xs"></i></button>
            </li>
            <li>
                <button class="z-10" @click="deleteUser(user.id)"><i class="fa-solid fa-trash-can text-xs"></i></button>
            </li>
        </ul>
    </div>
</template>