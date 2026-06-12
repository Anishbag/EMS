import cron from "node-cron";

import WFH from "../models/WFH.js";

cron.schedule(
  "0 0 * * *",
  async () => {

    const today =
      new Date();

    await WFH.updateMany(

      {

        status: "Approved",

        endDate: {
          $lt: today
        }

      },

      {

        status: "Expired"

      }

    );

    console.log(
      "WFH Expiry Checked"
    );

  }
);