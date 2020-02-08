"use strict";

const express = require("express");
const line = require("@line/bot-sdk");
const PORT = process.env.PORT || 3000;
const app = express();
const ENV = require("./env.json");
const config = {
  channelSecret: ENV.channelSecret,
  channelAccessToken: ENV.channelAccessToken
};
const client = new line.Client(config);

// MyData
const classData = require("./class.json");

const job = require("./batch.js");

app.get("/", (req, res) => res.send("aaa"));
app.post("/webhook", line.middleware(config), (req, res) => {
  console.log(req.body.events);
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  let text = "授業マイスター";
  const input = event.message.text;

  if (input.indexOf("時間割") >= 0 && input.indexOf("月曜") >= 0) {
    text = dayClass("mon");
  } else if (input.indexOf("時間割") >= 0 && input.indexOf("火曜") >= 0) {
    text = dayClass("thuse");
  } else if (input.indexOf("時間割") >= 0 && input.indexOf("水曜") >= 0) {
    text = dayClass("wednes");
  } else if (input.indexOf("時間割") >= 0 && input.indexOf("木曜") >= 0) {
    text = dayClass("thurs");
  } else if (input.indexOf("時間割") >= 0 && input.indexOf("金曜") >= 0) {
    text = dayClass("fri");
  } else if (input.indexOf("時間割") >= 0 && input.indexOf("今日") >= 0) {
    let date = new Date();
    let dayOfWeek = date.getDay();
    if (dayOfWeek == 1) {
      text = dayClass("mon");
    } else if (dayOfWeek == 2) {
      text = dayClass("thuse");
    } else if (dayOfWeek == 3) {
      text = dayClass("wednes");
    } else if (dayOfWeek == 4) {
      text = dayClass("thurs");
    } else if (dayOfWeek == 5) {
      text = dayClass("fri");
    } else {
      text = "今日は土日なので授業ないです";
    }
  } else if (input.indexOf("時間割") >= 0 && input.indexOf("明日") >= 0) {
    let date = new Date();
    let dayOfWeek;
    if (date.getDay() >= 6) {
      dayOfWeek = 0;
    } else {
      dayOfWeek = date.getDay() + 1;
    }
    if (dayOfWeek == 1) {
      text = dayClass("mon");
    } else if (dayOfWeek == 2) {
      text = dayClass("thuse");
    } else if (dayOfWeek == 3) {
      text = dayClass("wednes");
    } else if (dayOfWeek == 4) {
      text = dayClass("thurs");
    } else if (dayOfWeek == 5) {
      text = dayClass("fri");
    } else {
      text = "今日は土日なので授業ないです";
    }
  } else if (input.indexOf("時間割") >= 0 && input.indexOf("明後日") >= 0) {
    let date = new Date();
    let dayOfWeek;
    if (date.getDay() == 5) {
      dayOfWeek = 0;
    } else if (date.getDay() == 6) {
      dayOfWeek = 1;
    } else {
      dayOfWeek = date.getDay() + 2;
    }
    if (dayOfWeek == 1) {
      text = dayClass("mon");
    } else if (dayOfWeek == 2) {
      text = dayClass("thuse");
    } else if (dayOfWeek == 3) {
      text = dayClass("wednes");
    } else if (dayOfWeek == 4) {
      text = dayClass("thurs");
    } else if (dayOfWeek == 5) {
      text = dayClass("fri");
    } else {
      text = "今日は土日なので授業ないです";
    }
  } else if (input.indexOf("時間割") >= 0) {
    text =
      "[月曜日の時間割]\n" +
      dayClass("mon") +
      "\n\n" +
      "[火曜日の時間割]\n" +
      dayClass("thuse") +
      "\n\n" +
      "[水曜日の時間割]\n" +
      dayClass("wednes") +
      "\n\n" +
      "[木曜日の時間割]\n" +
      dayClass("thurs") +
      "\n\n" +
      "[金曜日の時間割]\n" +
      dayClass("fri");
  } else if (input.indexOf("教室") >= 0) {
    text = getRoom();
  } else {
    text =
      "適切なワードを入れてください。\n例えば、\n「月曜の時間割教えて」\n「次の教室教えて」\nなど";
  }

  console.log(text);
  return client.replyMessage(event.replyToken, {
    type: "text",
    text: text
  });
}

function dayClass(day) {
  let text = "";
  let dayData;
  if (day == "mon") {
    dayData = classData.mon;
  } else if (day == "thuse") {
    dayData = classData.thuse;
  } else if (day == "wednes") {
    dayData = classData.wednes;
  } else if (day == "thurs") {
    dayData = classData.thurs;
  } else if (day == "fri") {
    dayData = classData.fri;
  }
  if (dayData != undefined) {
    const lastKey =
      dayData[
        Object.keys(dayData)
          .sort()
          .pop()
      ];
    for (let item in dayData) {
      if (lastKey.period != dayData[item]["period"]) {
        text = text + item + "時間目：" + dayData[item]["name"] + "\n";
      } else {
        text = text + item + "時間目：" + dayData[item]["name"];
      }
    }
  } else {
    text = "今日は全休です。";
  }
  return text;
}

function getRoom() {
  let date = new Date();
  let dayOfWeek = date.getDay();
  let text = "";
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
  let hour = date.getHours() + date.getMinutes() / 60;
  if (hour < 8 + 2 / 3) {
    if (dayData["1"] != undefined) {
      text = dayData["1"].room;
    } else {
      text = "";
    }
  } else if (hour < 10 + 1 / 2) {
    if (dayData["2"] != undefined) {
      text = dayData["2"].room;
    } else {
      text = "";
    }
  } else if (hour < 13) {
    if (dayData["3"] != undefined) {
      text = dayData["3"].room;
    } else {
      text = "";
    }
  } else if (hour < 14 + 5 / 6) {
    if (dayData["4"] != undefined) {
      text = dayData["4"].room;
    } else {
      text = "";
    }
  } else if (hour < 16 + 2 / 3) {
    if (dayData["5"] != undefined) {
      text = dayData["5"].room;
    } else {
      text = "";
    }
  } else {
    text = "家";
  }
  if (text == "" || text == null) {
    text = "次の授業はありません";
  } else {
    text = "次の教室は「" + text + "」です";
  }
  return text;
}

// app.listen(PORT);
process.env.NOW_REGION ? (module.exports = app) : app.listen(PORT);
console.log(`Server running at ${PORT}`);
