import WFH from "../models/WFH.js";

export const applyWFH = async (req,res) => {

  try {

    const existingRequest =
      await WFH.findOne({

        employeeId: req.user.id,

        status: {
          $in: [
            "Pending",
            "Approved"
          ]
        }

      });

    if (existingRequest) {

      return res.status(400).json({
        message:
          "You already have an active WFH request"
      });

    }

    const request =
      await WFH.create({

        employeeId: req.user.id

      });

    res.status(201).json(request);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const getMyWFH = async (req,res) => {

  try {

    const requests =
      await WFH.find({

        employeeId: req.user.id

      });

    res.status(200).json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



export const getWFHRequests = async (req,res) => {

  try {

    const requests =
      await WFH.find()
      .populate(
        "employeeId",
        "name email"
      );

    res.status(200).json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const approveWFH = async (req,res) => {

  try {

    const request =
      await WFH.findById(
        req.params.id
      );

    if (!request) {

      return res.status(404).json({
        message:
          "Request not found"
      });

    }

    const activeWFH =
      await WFH.findOne({

        status: "Approved",

        endDate: {
          $gte: new Date()
        }

      });

    if (activeWFH) {

      return res.status(400).json({

        message:
          "Another employee is already working from home"

      });

    }

    const startDate =
      new Date();

    const endDate =
      new Date();

    endDate.setDate(
      endDate.getDate() + 30
    );

    request.status =
      "Approved";

    request.startDate =
      startDate;

    request.endDate =
      endDate;

    await request.save();

    res.status(200).json(request);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const rejectWFH = async (req,res) => {

  try {

    const request =
      await WFH.findById(
        req.params.id
      );

    if (!request) {

      return res.status(404).json({
        message:
          "Request not found"
      });

    }

    request.status =
      "Rejected";

    await request.save();

    res.status(200).json(request);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};