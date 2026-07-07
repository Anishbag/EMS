import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Create Employee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee",
    });

    const employee = await Employee.create({
      userId: user._id,
      department,
    });

    res.status(201).json({
      message: "Employee created successfully",
      user,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Employees + Search
export const getEmployees = async (req, res) => {
  try {
    const { search } = req.query;

    const employees = await Employee.find().populate(
      "userId",
      "name email role"
    );

    if (!search) {
      return res.status(200).json(employees);
    }

    const filteredEmployees = employees.filter((employee) => {
      return (
        employee.userId?.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.userId?.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.department
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    res.status(200).json(filteredEmployees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Employee By ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      "userId",
      "name email role"
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Employee
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    employee.department =
      req.body.department || employee.department;

    await employee.save();

    res.status(200).json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    await User.findByIdAndDelete(employee.userId);
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};