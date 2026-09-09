const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/calculate", (req, res) => {
    const { a, b, operation } = req.body;

    let result;

    if (operation === "+") result = a + b;
    else if (operation === "-") result = a - b;
    else if (operation === "*") result = a * b;
    else if (operation === "/") result = b !== 0 ? a / b : "Cannot divide by zero";
    else result = "Invalid operation";

    res.json({ result });
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
