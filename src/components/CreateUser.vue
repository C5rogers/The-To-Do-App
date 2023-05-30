<script setup>

const emit=defineEmits('close-the-form')


const handleSubmission=()=>{
    
}

</script>

<template>

    <Teleport to="body">
        <Transition name="create-user-form">
            <div class="fixed top-0 bottom-0 left-0 right-0 z-20 bg-gray-500 opacity-50 flex items-center justify-center">
                <!-- the container -->
                <div class="bg-white opacity-100 w-1/2 md:w-1/3 rounded-sm shadow-lg py-3 relative">
                    <!-- the title bar -->
                    <div class="w-full border-b border-gray-500 flex items-center justify-between px-2 py-1">
                        <!-- the title -->
                        <div class="text-gray-900 font-bold font-Roboto text-xs">
                            Creating User
                        </div>
                        <!-- the exit -->
                        <div class="absolute -right-5 -top-5 text-2xl cursor-pointer"><i class="fa-solid fa-times text-black"></i></div>
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
                                <label>User Name:</label>
                                <div>
                                    <i class="fa-solid fa-user-circle"></i>
                                    <input type="text" name="username" placeholder="User Name" >
                                </div>
                                <div>
                                    <input type="submit" name="create" value="Create">
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                
            </div>
        </Transition>
    </Teleport>

</template>