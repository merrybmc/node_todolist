const Task = require('../Task.schema');

const taskController = {};

// 데이터 쓰기 Create
taskController.createTask = async (req, res, next) => {
  try {
    const { task } = req.body;

    if (!task) {
      throw new Error('task의 값이 비어있습니다.');
    }
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 데이터 조회 Read
taskController.getTask = async (req, res, next) => {
  try {
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 데이터 수정 Update
taskController.putTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;
    const getTask = await Task.findOne({ _id: id });

    if (isComplete === getTask.isComplete) {
      throw new Error('isComplete의 값이 동일합니다.');
    }
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 데이터 삭제 Delete
taskController.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getTask = await Task.findOne({ _id: id });

    if (!getTask) {
      throw new Error('존재하지 않는 task입니다.');
    }
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = taskController;
