import { mount } from '@vue/test-utils';
import Todo from '../components/Todo.vue';

const makeFetchResponse = value => ({ json: async() => value });
const flushPromises = () => new Promise(r => setTimeout(r));

test('renders todo', () => {
  const wrapper = mount(Todo, {props: { todoObject: {todo: 'This is the todo', completed: false} }});

  const todo = wrapper.get('.todo div');

  expect(todo.text()).toContain('This is the todo');
})

test('mark todo as completed', async () => {
  const mockFetch = jest.fn()
    .mockReturnValue(makeFetchResponse({ completed: true }))
  global.fetch = mockFetch;

  const wrapper = mount(Todo, {props: { todoObject: {todo: 'This is the todo', completed: false} }});

  const todo = wrapper.get('.todo');

  expect(todo.classes()).toContain('incomplete');

  await wrapper.find('input[type="checkbox"]').setValue(true);

  expect(todo.classes()).toContain('completed');

  await flushPromises();
})

test('edit todo', async () => {
  const mockFetch = jest.fn()
    .mockReturnValue(makeFetchResponse({todo: 'Updated todo', completed: false}))
  global.fetch = mockFetch;

  const wrapper = mount(Todo, {props: { todoObject: {todo: 'This is the todo', completed: false} }});

  await wrapper.get('.editOptions button[data-test="editButton"]').trigger('click');

  await wrapper.get('input[type="text"]').setValue('Updated todo');

  await wrapper.get('button[data-test="saveButton"]').trigger('click');

  const todo = wrapper.get('.todo div');

  expect(todo.text()).toContain('Updated todo');

  await flushPromises();
})