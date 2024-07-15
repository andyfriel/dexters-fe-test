<script setup> 
import { computed, ref } from 'vue';
import { postTodo } from '../utils/data';

const emit = defineEmits(['added']);

const newTodo = ref('');

const disabledSubmit = computed(() => {
  return newTodo.value.length < 1;
});

const addTodo = () => {
  if(newTodo.value != '') {
    postTodo(newTodo.value).then((data) => {
      if(data.id) {
        emit('added', data);
        newTodo.value = '';
      }
    });
  }
};
</script>

<template>
  <h2>New To Do</h2>
  <form @submit.prevent="addTodo">
    <input type="text" v-model="newTodo" placeholder="Add a new todo..." />
    <button type="submit" :disabled="disabledSubmit" data-test="addButton">Add Todo</button>
  </form>
</template>

<style scoped>
form {
  padding: 5px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  
  input {
    border-radius: 8px;
    padding: 5px;
    width: 75%;
  } 
}
</style>
