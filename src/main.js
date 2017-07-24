import scss from './assets/scss/app.scss'

import Vue from 'vue'
import Router from 'vue-router'

import App from './components/App'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'App',
        component: App
    }, {
        path: '*',
        redirect: '/'
    }]
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');