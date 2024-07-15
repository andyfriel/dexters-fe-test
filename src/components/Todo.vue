<script setup> 
import { computed, ref } from 'vue';
import { updateTodo, deleteTodo } from '../utils/data';

const props = defineProps({
  todoObject: {
    type: [Object, null],
    required: true
  }
})
const emit = defineEmits(['deleted']);

const editForm = ref(false);
const editableTodo = ref(props.todoObject.todo);
const editLabel = computed(() => { return editForm.value ? 'Cancel' : 'Edit' });

const disabledSave = computed(() => {
  return editableTodo.length < 1;
});

const toggleCompleted = () => {
  props.todoObject.completed = !props.todoObject.completed;
  updateTodo(props.todoObject.id, props.todoObject.completed, props.todoObject.todo);
};

const saveTodo = () => {
  if(editableTodo.value != props.todoObject.todo) {
    const attemptUpdate = updateTodo(props.todoObject.id, props.todoObject.completed, editableTodo.value);
    if(attemptUpdate) {
      editForm.value = false;
      props.todoObject.todo = editableTodo.value;
    }
  } else {
    editForm.value = false;
  }
};

const removeTodo = () => {
  const attemptDelete = deleteTodo(props.todoObject.id);
  if(attemptDelete) {
    emit('deleted');
  };
};
</script>

<template>
  <div class="todo" :class="[ todoObject.completed ? 'completed' : 'incomplete' ]">
    <div>
      {{ todoObject.todo }}
      <div class="editOptions">
        <input type="checkbox" :checked="todoObject.completed" :model="todoObject.completed" @change="toggleCompleted" />
        <label>Completed</label>
        <button @click="editForm = !editForm" data-test="editButton">{{ editLabel }}</button>
        <button @click="removeTodo">Delete</button>
      </div> 
    </div>
    <div v-if="editForm"><input type="text" v-model="editableTodo" /><button @click="saveTodo" :disabled="disabledSave" data-test="saveButton">Save</button></div>
  </div>
</template>

<style scoped>
.todo {
  &:first-child {
    border-radius: 8px 8px 0 0;
    overflow: hidden;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
    overflow: hidden;
  }
  &.completed {
    border: 1px solid darkgreen;
    div:first-child {
      background-color: lightgreen;
    }
  }
  &.incomplete {
    border: 1px solid darksalmon;
    div:first-child {
      background-color: lightpink;
    }
  }
  
  div {
    padding: 5px;
    justify-content: space-between;
    display: flex;
    align-items: center;

    .editOptions {
      @media only screen and (max-width: 600px) {
        flex-direction: column;
        input, button {
          margin: 5px 0;
        }
      }
      input, button {
        margin-left: 10px;
      }
    } 
  }
}
</style>
