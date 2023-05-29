import { createWebHashHistory, createRouter } from "vue-router";


const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ('../pages/Home.vue')
    },
    {
        path: '/user/:id/tasks',
        name: 'UserTasks',
        component: () =>
            import ('../pages/UserTask.vue')
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router