<script>
export default {
  data() {
    return {
      title: 'Kanban.io',
      userName: 'User',
      loggedIn: true,
    }
  },
}
</script>

<template>
  <h1>{{ title }}</h1>
  <div class="project-grid"></div>

  <p v-if="loggedIn">Welcome back, {{ userName }}!</p>
  <p v-else>Please sign in to access this page.</p>
</template>
