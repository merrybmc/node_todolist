import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../utils/todoContext';
import api from '../utils/api';
import { getAsyncApi } from '../utils/apiCRUD';
import TodoBoard from './TodoBoard';
import { getLocalStorage, setCachedData, validSetCacheData } from '../utils/caching';
import { handleGetApiResponse } from '../utils/handleApiResponse';

function TodoList() {
  const { setTodoList } = useContext(TodoContext);
  const [todoValue, setTodoValue] = useState('');

  const addTask = async () => {
    const res = await api.post('/tasks', { task: todoValue, isComplete: false });

    handleGetApiResponse(res.status, '/tasks', setTodoList);
  };

  useEffect(() => {
    const cachedData = getLocalStorage('todoList');
    cachedData && setCachedData(cachedData, setTodoList);

    const getData = async () => {
      const res = await getAsyncApi('/tasks');
      const { data } = res.data;

      validSetCacheData(data, cachedData, 'todoList', setTodoList);
    };

    getData();
  }, [setTodoList]);

  const onChangeTodo = (e) => {
    setTodoValue(e.target.value);
  };

  return (
    <Container>
      <Row className='add-item-row'>
        <Col xs={12} sm={10}>
          <input
            type='text'
            value={todoValue}
            placeholder='할일을 입력하세요'
            className='input-box'
            onChange={(e) => onChangeTodo(e)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className='button-add' onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>
      <TodoBoard />
    </Container>
  );
}

export default TodoList;
