import './App.css';
import React from 'react';
import { TodoProvider } from './utils/todoContext';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}
