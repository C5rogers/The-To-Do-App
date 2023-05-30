<script setup>

const handleSubmission=()=>{
    
}

</script>

<template>

    <Teleport to="body">
        <Transition name="create-user-form">
            <div>
                <!-- the title bar -->
                <div>
                    <!-- the title -->
                    <div>
                        Creating User
                    </div>
                    <!-- the exit -->
                    <div><i class="fa-solid fa-times"></i></div>
                </div>
                <!-- the body part -->
                <div>
                    <!-- sub body -->
                    <div>
                        <!-- the image -->
                        <div class="image-holder">
                            <i class="fa-solid fa-user-circle text-2xl font-light text-gray-600"></i>
                        </div>

                        <!-- the form -->
                        <form @submit.prevent="handleSubmission">
                            
                        </form>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>

</template>