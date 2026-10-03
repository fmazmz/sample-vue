<script>
const PRIORITY_COLORS = {
  low: '#6e6e73',
  medium: '#b87800',
  high: '#c41e3a',
}

export default {
  data() {
    return {
      title: 'Kanban.io',
      userName: '',
      nameInput: '',
      taskInput: '',
      priorityInput: 'medium',
      nextId: 3,
      priorityColors: PRIORITY_COLORS,
      tasks: [
        { id: 1, title: 'Write acceptance criteria', status: 'todo', priority: 'high' },
        { id: 2, title: 'Spike API contract', status: 'in-progress', priority: 'medium' },
      ],
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
    tasksFor(status) {
      return this.tasks.filter((task) => task.status === status)
    },
    addTask() {
      const title = this.taskInput.trim()
      if (!title) return
      this.tasks.push({
        id: this.nextId++,
        title,
        status: 'todo',
        priority: this.priorityInput,
      })
      this.taskInput = ''
      this.priorityInput = 'medium'
    },
    removeTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
    moveTask(id, status) {
      const task = this.tasks.find((item) => item.id === id)
      if (task) task.status = status
    },
    priorityStyle(task) {
      return { borderLeft: `4px solid ${PRIORITY_COLORS[task.priority]}` }
    },
    cyclePriority(task) {
      const order = ['low', 'medium', 'high']
      const index = order.indexOf(task.priority)
      task.priority = order[(index + 1) % order.length]
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

    <form @submit.prevent="addTask">
      <input v-model="taskInput" type="text" placeholder="New task" required>
      <select v-model="priorityInput">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add</button>
    </form>

    <div class="project-grid">
      <div class="project-card">
        <h3>To do</h3>
        <ul>
          <li
            v-for="task in tasksFor('todo')"
            :key="task.id"
            :style="priorityStyle(task)"
          >
            {{ task.title }}
            <button
              type="button"
              :style="{ color: priorityColors[task.priority] }"
              @click="cyclePriority(task)"
            >
              {{ task.priority }}
            </button>
            <button type="button" @click="moveTask(task.id, 'in-progress')">→</button>
            <button type="button" @click="removeTask(task.id)">Remove</button>
          </li>
        </ul>
      </div>
      <div class="project-card">
        <h3>In progress</h3>
        <ul>
          <li
            v-for="task in tasksFor('in-progress')"
            :key="task.id"
            :style="priorityStyle(task)"
          >
            {{ task.title }}
            <button
              type="button"
              :style="{ color: priorityColors[task.priority] }"
              @click="cyclePriority(task)"
            >
              {{ task.priority }}
            </button>
            <button type="button" @click="moveTask(task.id, 'todo')">←</button>
            <button type="button" @click="moveTask(task.id, 'done')">→</button>
            <button type="button" @click="removeTask(task.id)">Remove</button>
          </li>
        </ul>
      </div>
      <div class="project-card">
        <h3>Done</h3>
        <ul>
          <li
            v-for="task in tasksFor('done')"
            :key="task.id"
            :style="priorityStyle(task)"
          >
            {{ task.title }}
            <button
              type="button"
              :style="{ color: priorityColors[task.priority] }"
              @click="cyclePriority(task)"
            >
              {{ task.priority }}
            </button>
            <button type="button" @click="moveTask(task.id, 'in-progress')">←</button>
            <button type="button" @click="removeTask(task.id)">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
