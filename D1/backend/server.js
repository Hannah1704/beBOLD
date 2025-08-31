
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(express.json());
const pathToFiles = path.resolve(__dirname, "../../frontend/public");
app.use(express.static(pathToFiles));


app.get("/", (req, res) => {
  res.sendFile("index.html", { root: pathToFiles });
});

// -------------------------------------------------------------------------------------

  // REGISTER
  // success always - check application/network tab to see data
app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;

  res.json({
    success: true,
    message: "User registered successfully( stubbed)",
    user: { id: 1, email },
    token: "fake-jwt-token-123",
  });
});

// LOGIN
// success always - check application/network tab to see data
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  res.json({
    success: true,
    message: "Login successful (stubbed)",
    user: { id: 1, email },
    token: "fake-jwt-token-123",
  });
});

// -------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`beBOLD running on http://localhost:${PORT}`);
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
