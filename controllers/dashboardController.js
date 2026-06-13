import User from "../models/User.js";
import Leave from "../models/Leave.js";
import Task from "../models/Task.js";
import WFH from "../models/WFH.js";


export const getAdminDashboard = async (req,res) => {
  try {

    const totalEmployees =
      await User.countDocuments({
        role: "Employee"
      });

    const totalTasks =
      await Task.countDocuments();

    const completedTasks =
      await Task.countDocuments({
        status: "Completed"
      });

    const pendingTasks =
      await Task.countDocuments({
        status: {
          $in: [
            "Pending",
            "In Progress"
          ]
        }
      });

    const pendingLeaves =
      await Leave.countDocuments({
        status: "Pending"
      });

    const activeWFH =
      await WFH.countDocuments({
        status: "Approved"
      });

    res.status(200).json({
      totalEmployees,
      totalTasks,
      completedTasks,
      pendingTasks,
      pendingLeaves,
      activeWFH
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


//----------->>>

export const getEmployeeDashboard =
  async (req, res) => {

    try {

      const totalTasks =
        await Task.countDocuments({
          assignedTo: req.user.id
        });

      const completedTasks =
        await Task.countDocuments({
          assignedTo: req.user.id,
          status: "Completed"
        });

      const pendingTasks =
        await Task.countDocuments({
          assignedTo: req.user.id,
          status: {
            $in: [
              "Pending",
              "In Progress"
            ]
          }
        });

      const leaveCount =
        await Leave.countDocuments({
          employeeId: req.user.id
        });

      const activeWFH =
        await WFH.findOne({
          employeeId: req.user.id,
          status: "Approved"
        });

      res.status(200).json({
        totalTasks,
        completedTasks,
        pendingTasks,
        leaveCount,
        wfhStatus:
          activeWFH
            ? "Approved"
            : "None"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };