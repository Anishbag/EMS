import Task from "../models/Task.js";
import Employee from "../models/Employee.js";


export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      assignAll,
      department,
      dueDate
    } = req.body;

    let userIds = [];

    // Assign to all employees
    if (assignAll) {
      const employees = await Employee.find().populate("userId");

      userIds = employees.map(emp => emp.userId._id);
    }

    // Assign by department
    else if (department) {
      const employees = await Employee.find({
        department
      }).populate("userId");

      userIds = employees.map(emp => emp.userId._id);
    }

    // Assign multiple employees
    else if (Array.isArray(assignedTo)) {
      userIds = assignedTo;
    }

    // Assign single employee
    else {
      userIds = [assignedTo];
    }

    const tasks = await Promise.all(
      userIds.map(userId =>
        Task.create({
          title,
          description,
          assignedTo: userId,
          assignedBy: req.user.id,
          dueDate
        })
      )
    );

    res.status(201).json({
      message: "Task assigned successfully",
      totalAssigned: tasks.length,
      tasks
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};




export const getTasks = async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email");

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const getMyTasks = async (req,res) => {

  try {

    const tasks = await Task.find({
      assignedTo: req.user.id
    });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const updateTaskStatus = async (req,res) => {

  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    if (
      task.assignedTo.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message:
          "You can update only your task"
      });
    }

    task.status = req.body.status;

    await task.save();

    res.status(200).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



export const updateTask = async (req,res) => {

  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    task.title =
      req.body.title || task.title;

    task.description =
      req.body.description ||
      task.description;

    task.dueDate =
      req.body.dueDate ||
      task.dueDate;

    await task.save();

    res.status(200).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const deleteTask = async (req,res) => {

  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};