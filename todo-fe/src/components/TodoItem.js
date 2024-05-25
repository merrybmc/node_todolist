import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { deleteAsyncApi, putAsyncApi } from '../utils/apiCRUD';
import { handleGetApiResponse } from '../utils/handleApiResponse';
import { TodoContext } from '../utils/todoContext';

const TodoItem = ({ item }) => {
  const { setTodoList } = useContext(TodoContext);

  const onTaskComplete = async () => {
    const res = await putAsyncApi(`/tasks/${item._id}`, { isComplete: !item.isComplete });
    handleGetApiResponse(res.status, '/tasks', setTodoList);
  };

  const onTaskDelete = async () => {
    const res = await deleteAsyncApi(`/tasks/${item._id}`);
    handleGetApiResponse(res.status, '/tasks', setTodoList);
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div
            className='todo-content'
            style={{
              textDecoration: item.isComplete && 'line-through',
              fontWeight: item.isComplete && '700',
            }}
          >
            {item.task}
          </div>

          <div>
            <button className='button-delete' onClick={onTaskDelete}>
              삭제
            </button>
            <button className='button-delete' onClick={onTaskComplete}>
              끝남
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
