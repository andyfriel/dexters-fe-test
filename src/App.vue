<script setup>
import { computed, ref, watchEffect } from 'vue';
import Todo from './components/Todo.vue';
import AddForm from './components/AddForm.vue';
import { fetchTodos } from './utils/data';

const todos = ref([]);
const filter = ref('all');

fetchTodos().then((data) => {
  todos.value = data.todos;
});

const displayedTodos = computed(() => {
  return todos.value.filter((todo) => {
    return filter.value === 'incomplete' && todo.completed || filter.value === 'completed' && !todo.completed ? false : true;
  });
});

const removeTodo = (id) => {
  const i = todos.value.map(item => item.id).indexOf(id);
  todos.value.splice(i, 1);
};

const addTodo = (newTodo) => {
  todos.value.push({ todo: newTodo.todo, completed: newTodo.completed, id: newTodo.id});
};

</script>

<template>
  <h1>To-Do List</h1>
  <select v-model="filter">
    <option value="all">All Todos</option>
    <option value="incomplete">Incomplete Todos</option>
    <option value="completed">Completed Todos</option>
  </select>

  <div class="todoList">
    <Todo v-for="item in displayedTodos" :key="item.id" :todoObject="item" @deleted="removeTodo(item.id)" />
    <div v-if="todos.length == 0">No to-dos found</div>
  </div>

  <AddForm @added="addTodo" />
</template>

<style scoped>
.todoList {
  margin-top: 20px;
  text-align: left;
  width: 100%;
  max-width: 900px;
}

select {
  border-radius: 8px;
  padding: 5px;
  width: 200px;
}
</style>
