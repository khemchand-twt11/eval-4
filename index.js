const express = require("express");

const { userRotute } = require("./routes/users.route");
const { connection } = require("./configs/db");
const { cityRoute } = require("./routes/city.route");
const { authentication } = require("./middlewares/auth.middleware");

const app = express();
const PORT = 8000 || 3030;
app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).send("HOME PAGE");
});

//ROUTES
app.use("/user", userRotute);
app.use(authentication);
app.use("/city", cityRoute);
app.listen(PORT, async () => {
  try {
    await connection();
  } catch (error) {
    console.log(error.message);
  }

  console.log("server is running at port", PORT);
});
