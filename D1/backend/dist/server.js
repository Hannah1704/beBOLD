"use strict";

var express = require("express");
var path = require("path");
var app = express();
var PORT = 3000;
app.use(express.json());
var pathToFiles = path.resolve(__dirname, "../../frontend/public");
app.use(express["static"](pathToFiles));
app.get("/", function (req, res) {
  res.sendFile("index.html", {
    root: pathToFiles
  });
});

// -------------------------------------------------------------------------------------

// REGISTER
// success always - check application/network tab to see data
app.post("/api/auth/register", function (req, res) {
  var _req$body = req.body,
    email = _req$body.email,
    password = _req$body.password;
  res.json({
    success: true,
    message: "User registered successfully( stubbed)",
    user: {
      id: 1,
      email: email
    },
    token: "fake-jwt-token-123"
  });
});

// LOGIN
// success always - check application/network tab to see data
app.post("/api/auth/login", function (req, res) {
  var _req$body2 = req.body,
    email = _req$body2.email,
    password = _req$body2.password;
  res.json({
    success: true,
    message: "Login successful (stubbed)",
    user: {
      id: 1,
      email: email
    },
    token: "fake-jwt-token-123"
  });
});

// -------------------------------------------------------------------------------------
app.listen(PORT, function () {
  console.log("beBOLD running on http://localhost:".concat(PORT));
});

// -------------------------------------------------------------------------------------

// const express = require("express");
// const path = require("path");

// const app = express();
// const PORT = 3000;

// const pathToFiles = path.resolve(__dirname, "../../frontend/public");
// app.use(express.static(pathToFiles));

// app.get("/", (req, res) => {
//   res.sendFile("index.html", { root:pathToFiles });
// });

// app.listen(PORT, () => {
//   console.log(`beBOLD running on http://localhost:${PORT}`);
// });