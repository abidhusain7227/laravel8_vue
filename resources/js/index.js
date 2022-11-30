import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/js/views/Home';
import Contact from '@/js/views/Contact';
import About from '@/js/views/About';
import pageNotfound from "@/js/views/pagenotfound";
import Employe from "./views/Employe/employe_list.vue";
import Employe_add from "./views/Employe/add.vue";
import Employe_edit from './views/Employe/edit.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            name: '404',
            component: pageNotfound
        },
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact
        },
        {
            path: '/employe',
            name: 'employe',
            component: Employe
        },
        {
            path: '/employe/add',
            name: 'employe/add',
            component: Employe_add
        },
        {
            path: '/employe/edit',
            name: '/employe/edit',
            component: Employe_edit
        }
    ]
});

export default router;