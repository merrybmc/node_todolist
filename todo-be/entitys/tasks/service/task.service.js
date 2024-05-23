const Task = require('../Task.schema');

const taskService = {};

taskService.createTask = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { task, isComplete } = req;

    const newTask = new Task({ task, isComplete });
    await newTask.save();

    req.statusCode = 200;
    req.data = newTask;
  } catch (e) {
    req.error = e.message;
  }
  next();
};

taskService.getTask = async (req, res, next) => {
  try {
    const taskList = await Task.find({});

    req.statusCode = 200;
    req.data = taskList;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

taskService.putTask = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { id } = req.params;
    const { isComplete } = req.body;

    // case 1 mongodb
    // const putTask = await Task.updateOne({ _id: id }, { $set: { isComplete } });

    // case 2 $set 생략 가능
    // const putTask = await Task.updateOne({ _id: id }, { isComplete });

    // case 3 mongoose findByIdUpdate
    // parameter 1 = id 값 전달, 알아서 추적해냄
    // parameter 2 = 바꿀 객체 전달
    // parameter 3 = 옵션 객체 {new: true} = 변경사항이 반영된 값 전달 여부
    const putTask = await Task.findByIdAndUpdate(id, { isComplete }, { new: true });

    req.statusCode = 200;
    req.data = putTask;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

taskService.deleteTask = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { id } = req.params;

    // const deleteTask = await Task.deleteOne({ _id: id });
    // findByIdAndDelete는 id값만 전달, 옵션 객체는 일반적으로 많이 쓰이지 않음
    const deleteTask = await Task.findByIdAndDelete(id);

    req.statusCode = 200;
    req.data = deleteTask;
  } catch (e) {
    req.statusCode = 400;
    ㅏ;
    req.error = e.message;
  }
  next();
};

module.exports = taskService;
