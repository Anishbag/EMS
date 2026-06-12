import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createEmployee = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      department
    } = req.body;

    const exists = await User.findOne({
      email
    });

    if (exists) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "Employee"
    });

    const employee = await Employee.create({
      userId: user._id,
      department
    });

    res.status(201).json({
      user,
      employee
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



export const getEmployees = async (req, res) => {

  try {

    const employees =
      await Employee.find()
      .populate(
        "userId",
        "name email role"
      );

    res.status(200).json(employees);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



export const getEmployeeById = async (
  req,
  res
) => {

  try {

    const employee =
      await Employee.findById(
        req.params.id
      ).populate(
        "userId",
        "name email role"
      );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json(employee);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const updateEmployee = async (
  req,
  res
) => {

  try {

    const employee =
      await Employee.findById(
        req.params.id
      );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    employee.department =
      req.body.department ||
      employee.department;

    await employee.save();

    res.status(200).json(employee);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



export const deleteEmployee = async (
  req,
  res
) => {

  try {

    const employee =
      await Employee.findById(
        req.params.id
      );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    await User.findByIdAndDelete(
      employee.userId
    );

    await Employee.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Employee deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};