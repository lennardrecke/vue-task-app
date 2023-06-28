<template>
  <div :class="{ app: true, 'light-mode': !darkMode, 'dark-mode': darkMode }">
    <div class="mode-toggle">
        <label>
          <input type="checkbox" v-model="darkMode">
          Light Mode
          <span class="mode-toggle-slider"></span>
          Dark Mode
        </label>
      </div>
    <div class="container">
      <div class="input-container">
        <input type="text" v-model="newTask" placeholder="Enter title of task">
        <button @click="addTask">Add Task</button>
      </div>
      <div class="task-container">
        <div v-if="tasks.length === 0" class="no-tasks">
          No tasks found.
        </div>
        <div v-else>
          <div class="task" v-for="(task, index) in tasks" :key="index">
            <span class="task-name">{{ task.name }}</span>
            <button @click="completeTask(index)" v-if="!task.completed" class="complete-button">
              <font-awesome-icon :icon="['fas', 'check']" />
            </button>
            <button @click="removeTask(index)" class="remove-button">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </div>
      </div>
      <div class="completed-task-container">
        <div v-if="completedTasks.length === 0" class="no-tasks">
          No completed tasks.
        </div>
        <div v-else>
          <div class="task completed-task" v-for="(task, index) in completedTasks" :key="index">
            <span class="task-name">{{ task.name }}</span>
            <button @click="removeCompletedTask(index)" class="remove-button">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck, faTrash);

export default {
  name: 'App',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      newTask: '',
      tasks: [
        { name: 'Task 1', completed: false },
        { name: 'Task 2', completed: false },
        { name: 'Task 3', completed: false },
        { name: 'Task 4', completed: false },
      ],
      completedTasks: [],
      darkMode: false,
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({
          name: this.newTask,
          completed: false,
        });
        this.newTask = '';
      }
    },
    completeTask(index) {
      this.tasks[index].completed = true;
      const completedTask = this.tasks.splice(index, 1)[0];
      this.completedTasks.push(completedTask);
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    removeCompletedTask(index) {
      this.completedTasks.splice(index, 1);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
.app {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
}

.light-mode {
  background-color: #fff;
  color: #333;
}

.dark-mode {
  background-color: #292929;
  color: #fff;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-container input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
}


.dark-mode .input-container input {
  background-color: #121212;
  color: #fff;
  border-color: #333;
}
.input-container input:focus {
  outline: none;
  border-color: #007bff;
}

.input-container button {
  padding: 8px 12px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-container,
.task-container,
.completed-task-container
{
  background-color: #efefef;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
}

.dark-mode .input-container,
.dark-mode .task-container,
.dark-mode .completed-task-container {
  background-color: #121212;
}

.no-tasks {
  text-align: center;
  padding: 10px;
  font-style: italic;
}

.task {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.dark-mode .task {
  background-color: #292929;
}

.task-name {
  flex: 1;
  font-size: 16px;
}

button {
  padding: 5px;
  font-size: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
}

.complete-button {
  color: green;
  margin-right: 10px;
}

.remove-button {
  color: red;
}

.fa-check,
.fa-trash {
  font-size: 16px;
}

.mode-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding-left: 10px;
}

.mode-toggle label {
  display: flex;
  align-items: center;
  color: #333;
}

.mode-toggle input[type="checkbox"] {
  opacity: 0;
  width: 0;
  height: 0;
}

.mode-toggle-slider {
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 20px;
  position: relative;
  margin: 10px;
  transition: background-color 0.3s;
}

.mode-toggle-slider::before {
  content: '';
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}

input[type="checkbox"]:checked + .mode-toggle-slider {
  background-color: #007bff;
}

input[type="checkbox"]:checked + .mode-toggle-slider::before {
  transform: translateX(20px);
}

.light-mode .mode-toggle label {
  color: #333;
}

.dark-mode .mode-toggle label {
  color: #fff;
}

.completed-task-container .task {
  text-decoration: line-through;
}

</style>