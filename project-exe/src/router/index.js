import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(""),  
    routes: [    
        {      
            path: "/",      
            name: "LogInPage",      
            component: () => import("@/views/LogInPage.vue"),    
        },
        {      
            path: "/join",      
            name: "JoinPage",      
            component: () => import("@/views/join/JoinPage.vue"),    
        },
        {      
            path: "/auth",      
            name: "AuthPage",      
            component: () => import("@/views/join/AuthPage.vue"),    
        },
        {      
            path: "/joinform",      
            name: "JoinForm",      
            component: () => import("@/views/join/JoinForm.vue"),    
        },        
        {      
            path: "/findid",      
            name: "FindID",      
            component: () => import("@/views/find/FindID.vue"),    
        },   
        {      
            path: "/yourid",      
            name: "YourID",      
            component: () => import("@/views/find/YourID.vue"),    
        },       
        // {      
        //     path: "/",      
        //     name: "HelloWorld",      
        //     component: () => import("../components/HelloWorld.vue"),    
        // },  
        {      
            path: "/test",      
            name: "TestingPinia",      
            component: () => import("@/views/TestingPinia.vue"),    
        },      
    ],
}); 

export default router;