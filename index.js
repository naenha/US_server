var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
const cors = require("cors");

const { sequelize } = require("./models");

app.use(
  session({ secret: "MySecret", resave: false, saveUninitialized: true })
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// Passport setting
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/main"));
app.use("/auth", require("./routes/auth"));
app.use("/api/question", require("./routes/question"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/user", require("./routes/user"));
app.use("/api/share", require("./routes/share"));

// Port setting
var port = 8080;
app.listen(port, function () {
  console.log("server on! http://localhost:" + port);
});
