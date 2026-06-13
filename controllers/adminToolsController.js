import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Task from "../models/Task.js";


export const searchEmployees = async (req, res) => {
  try {

    const keyword = req.query.name || "";

    const users = await User.find({
      role: "Employee",
      name: {
        $regex: keyword,
        $options: "i"
      }
    }).select("-password");

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};




export const filterByDepartment = async (req,res) => {

  try {

    const employees =
      await Employee.find({
        department:
          req.params.department
      }).populate(
        "userId",
        "name email role"
      );

    res.status(200).json(
      employees
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};




export const assignTaskToAll = async (req,res) => {

  try {

    const {
      title,
      description,
      dueDate
    } = req.body;

    const employees =
      await User.find({
        role: "Employee"
      });

    const tasks =
      employees.map(emp => ({
        title,
        description,
        dueDate,
        assignedTo: emp._id,
        assignedBy: req.user.id
      }));

    await Task.insertMany(tasks);

    res.status(201).json({
      message:
        "Task assigned to all employees"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};




export const deleteDepartmentEmployees =
  async (req, res) => {

    try {

      const department =
        req.params.department;

      const employees =
        await Employee.find({
          department
        });

      const userIds =
        employees.map(
          emp => emp.userId
        );

      await Employee.deleteMany({
        department
      });

      await User.deleteMany({
        _id: {
          $in: userIds
        }
      });

      res.status(200).json({
        message:
          `${department} department deleted successfully`
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }
  };