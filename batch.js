"use strict";

const schedule = require("node-schedule");
const ENV = require("./env.json");
const config = {
  channelSecret: ENV.channelSecret,
  channelAccessToken: ENV.channelAccessToken
};
const line = require("@line/bot-sdk");
const client = new line.Client(config);

// Mydata
const classData = require("./class.json");
const USER_ID = ENV.USER_ID;

// const myJob = schedule.scheduleJob("*/10 * * * * *", () => {
//
// });

const job1 = schedule.scheduleJob(
  {
    hour: 8,
    minute: 20
  },
  () => {
    let date = new Date();
    let dayOfWeek = date.getDay();
    let dayData;
    if (dayOfWeek == 1) {
      dayData = classData.mon;
    } else if (dayOfWeek == 2) {
      dayData = classData.thuse;
    } else if (dayOfWeek == 3) {
      dayData = classData.wednes;
    } else if (dayOfWeek == 4) {
      dayData = classData.thurs;
    } else if (dayOfWeek == 5) {
      dayData = classData.fri;
    } else {
      dayData = "";
    }
    if ((dayOfWeek != 6 || dayOfWeek != 0) && dayData["1"] != undefined) {
      client.pushMessage(USER_ID, {
        type: "text",
        text: dayData["1"].room
      });
    }
  }
);

const job2 = schedule.scheduleJob(
  {
    hour: 10,
    minute: 10
  },
  () => {
    let date = new Date();
    let dayOfWeek = date.getDay();
    let dayData;
    if (dayOfWeek == 1) {
      dayData = classData.mon;
    } else if (dayOfWeek == 2) {
      dayData = classData.thuse;
    } else if (dayOfWeek == 3) {
      dayData = classData.wednes;
    } else if (dayOfWeek == 4) {
      dayData = classData.thurs;
    } else if (dayOfWeek == 5) {
      dayData = classData.fri;
    } else {
      dayData = "";
    }
    if ((dayOfWeek != 6 || dayOfWeek != 0) && dayData["2"] != undefined) {
      client.pushMessage(USER_ID, {
        type: "text",
        text: dayData["2"].room
      });
    }
  }
);

const job3 = schedule.scheduleJob(
  {
    hour: 12,
    minute: 0
  },
  () => {
    let date = new Date();
    let dayOfWeek = date.getDay();
    let dayData;
    if (dayOfWeek == 1) {
      dayData = classData.mon;
    } else if (dayOfWeek == 2) {
      dayData = classData.thuse;
    } else if (dayOfWeek == 3) {
      dayData = classData.wednes;
    } else if (dayOfWeek == 4) {
      dayData = classData.thurs;
    } else if (dayOfWeek == 5) {
      dayData = classData.fri;
    } else {
      dayData = "";
    }
    if ((dayOfWeek != 6 || dayOfWeek != 0) && dayData["3"] != undefined) {
      client.pushMessage(USER_ID, {
        type: "text",
        text: dayData["3"].room
      });
    }
  }
);

const job4 = schedule.scheduleJob(
  {
    hour: 14,
    minute: 30
  },
  () => {
    let date = new Date();
    let dayOfWeek = date.getDay();
    let dayData;
    if (dayOfWeek == 1) {
      dayData = classData.mon;
    } else if (dayOfWeek == 2) {
      dayData = classData.thuse;
    } else if (dayOfWeek == 3) {
      dayData = classData.wednes;
    } else if (dayOfWeek == 4) {
      dayData = classData.thurs;
    } else if (dayOfWeek == 5) {
      dayData = classData.fri;
    } else {
      dayData = "";
    }
    if ((dayOfWeek != 6 || dayOfWeek != 0) && dayData["4"] != undefined) {
      client.pushMessage(USER_ID, {
        type: "text",
        text: dayData["4"].room
      });
    }
  }
);

const job5 = schedule.scheduleJob(
  {
    hour: 16,
    minute: 20
  },
  () => {
    let date = new Date();
    let dayOfWeek = date.getDay();
    let dayData;
    if (dayOfWeek == 1) {
      dayData = classData.mon;
    } else if (dayOfWeek == 2) {
      dayData = classData.thuse;
    } else if (dayOfWeek == 3) {
      dayData = classData.wednes;
    } else if (dayOfWeek == 4) {
      dayData = classData.thurs;
    } else if (dayOfWeek == 5) {
      dayData = classData.fri;
    } else {
      dayData = "";
    }
    if ((dayOfWeek != 6 || dayOfWeek != 0) && dayData["5"] != undefined) {
      client.pushMessage(USER_ID, {
        type: "text",
        text: dayData["5"].room
      });
    }
  }
);
