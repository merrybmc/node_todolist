const taskController = {};

taskController.createTask = async (req, res, next) => {
  const { task, isComplete } = req.body;

  if (!task) {
    req.statusCode = 400;
    req.error = 'task의 값이 비어있습니다.';
    return next();
  }

  req.task = task;
  req.isComplete = isComplete;

  next();
};

taskController.getTask = async (req, res, next) => {
  try {
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = taskController;
