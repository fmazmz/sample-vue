<script>
export default {
  data() {
    return {
      title: 'Kanban.io',
      userName: '',
      nameInput: '',
    }
  },
  methods: {
    signIn() {
      const name = this.nameInput.trim()
      if (!name) return
      this.userName = name
      this.nameInput = ''
    },
    signOut() {
      this.userName = ''
    },
  },
}
</script>

<template>
  <section v-if="!userName">
    <h1>{{ title }}</h1>
    <p>Enter your name to open the board.</p>
    <form @submit.prevent="signIn">
      <input v-model="nameInput" type="text" placeholder="Name" required>
      <button type="submit">Start</button>
    </form>
  </section>

  <section v-else>
    <header>
      <h1>{{ title }}</h1>
      <p>Welcome, {{ userName }}</p>
      <button type="button" @click="signOut">Sign out</button>
    </header>

    <div class="project-grid">
      <div class="project-card">
        <h3>To do</h3>
      </div>
      <div class="project-card">
        <h3>In progress</h3>
      </div>
      <div class="project-card">
        <h3>Done</h3>
      </div>
    </div>
  </section>
</template>
