const Messages = require("../models/messageModel");

const dateFormatter = new Intl.DateTimeFormat([], {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
});
const timeFormatter = new Intl.DateTimeFormat([], {
  hour: "numeric",
  minute: "numeric",
  timeZoneName: "short",
});

function getHumanFriendlyDelta(iso8601_date_string) {
  const date = new Date(Date.parse(iso8601_date_string));
  const now = new Date();

  const deltaMilliseconds = now - date;
  const deltaSeconds = Math.floor(deltaMilliseconds / 1000);
  const deltaMinutes = Math.floor(deltaSeconds / 60);
  const deltaHours = Math.floor(deltaMinutes / 60);

  if (deltaSeconds < 5) {
    return "just now";
  } else if (deltaSeconds < 60) {
    return deltaSeconds + " seconds ago";
  } else if (deltaMinutes == 1) {
    return "1 minute ago";
  } else if (deltaMinutes < 60) {
    return deltaMinutes + " minutes ago";
  } else if (deltaHours == 1) {
    return "1 hour ago";
  } else if (deltaHours < 6) {
    return deltaHours + " hours ago";
  } else {
    return date.toDateString();
  }
}

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt: getHumanFriendlyDelta(msg.createdAt.toString()),
      };
    });
    res.json(projectedMessages);
  } catch (err) {
    res.json(err);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (err) {
    res.json(err);
  }
};
