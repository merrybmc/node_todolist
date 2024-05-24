import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import { TodoContext } from '../utils/todoContext';

const TodoBoard = () => {
  const { todoList } = useContext(TodoContext);
  console.log(todoList);
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((item) => <TodoItem item={item} />)
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;
