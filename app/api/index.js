import { v4 } from 'node-uuid';

const fakeDatabase = {
  todos: [
    { id: v4(), text: 'react', completed: true },
    { id: v4(), text: 'redux', completed: false },
    { id: v4(), text: 'react-redux', completed: true },
    { id: v4(), text: 'react-router', completed: false }
  ]
};

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// const delay = () => new Promise(resolve => setTimeout(resolve, 500));

export const fetchTodos = (filter) => {
  switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed);
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed);
      default:
        throw new Error(`Unknow filter: ${filter}.`);
    };
};