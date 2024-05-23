import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoBoard from './components/TodoBoard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import api from './utils/api';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const getTasks = async () => {
    const res = await api.get('/tasks');
    setTodoList(res.data.data);
  };

  const addTask = async () => {
    try {
      const res = await api.post('/tasks', { task: todoValue, isComplete: false });

      if (res.status === 200) {
        getTasks();
        setTodoValue('');
      } else throw new Error('task can not be added');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

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

      <TodoBoard todoList={todoList} />
    </Container>
  );
}

export default App;
