const { createApp } = Vue

createApp({
    data() {
        return {
            title: 'Kanban.io',
            userName: 'User',
            loggedIn: true
        }
    },
}).mount('#app')
