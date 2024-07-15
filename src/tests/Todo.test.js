import { mount } from '@vue/test-utils';
import Todo from '../components/Todo.vue';

test('renders todo', () => {
  const wrapper = mount(Todo, {props: { todoObject: {todo: 'This is the todo', completed: false} }});

  const todo = wrapper.get('.todo div');

  expect(todo.text()).toContain('This is the todo');
})

test('mark todo as completed', async () => {
  const wrapper = mount(Todo, {props: { todoObject: {todo: 'This is the todo', completed: false} }});

  const todo = wrapper.get('.todo');

  expect(todo.classes()).toContain('incomplete');

  await wrapper.find('input[type="checkbox"]').setValue(true);

  expect(todo.classes()).toContain('completed');
})

test('edit todo', async () => {
  const wrapper = mount(Todo, {props: { todoObject: {todo: 'This is the todo', completed: false} }});

  await wrapper.get('.editOptions button[data-test="editButton"]').trigger('click');

  await wrapper.get('input[type="text"]').setValue('Updated todo');

  await wrapper.get('button[data-test="saveButton"]').trigger('click');

  const todo = wrapper.get('.todo div');

  expect(todo.text()).toContain('Updated todo');
})