import Leave from "../models/Leave.js";


export const applyLeave = async (req, res) => {
  try {

    const {fromDate,toDate,reason} = req.body;

    const leave = await Leave.create({
      employeeId: req.user.id,
      fromDate,
      toDate,
      reason
    });

    res.status(201).json(leave);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



export const getMyLeaves = async (req, res) => {
  try {

    const leaves = await Leave.find({
      employeeId: req.user.id
    });

    res.status(200).json(leaves);

  } 
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



export const getLeaves = async (req, res) => {
  try {

    const leaves = await Leave.find()
      .populate("employeeId","name email");

    res.status(200).json(leaves);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const approveLeave = async (req,res) => {

  try {

    const leave = await Leave.findById(
      req.params.id
    );

    if (!leave) {
      return res.status(404).json({
        message: "Leave not found"
      });
    }

    leave.status = "Approved";

    await leave.save();

    res.status(200).json(leave);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const rejectLeave = async (req,res) => {

  try {

    const leave = await Leave.findById(
      req.params.id
    );

    if (!leave) {
      return res.status(404).json({
        message: "Leave not found"
      });
    }

    leave.status = "Rejected";

    await leave.save();

    res.status(200).json(leave);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};