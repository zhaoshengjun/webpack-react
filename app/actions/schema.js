import { Schema, arrayOf } from 'normalizr';

export const todo = new Schema('todos');
export const arrayofTodos = arrayOf(todo);