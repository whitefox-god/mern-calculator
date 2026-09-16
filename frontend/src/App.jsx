import { useState } from "react";

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState("");

  const calculate = async () => {
    const response = await fetch("http://localhost:5000/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        a: Number(a),
        b: Number(b),
        operation,
      }),
    });

    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>MERN Calculator</h1>

      <input
        type="number"
        placeholder="First number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />

      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
      >
        <option value="+">+</option>
        <option value="-">−</option>
        <option value="*">×</option>
        <option value="/">÷</option>
      </select>

      <input
        type="number"
        placeholder="Second number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <br />
      <br />

      <button onClick={calculate}>Calculate</button>

      <h2>Result: {result}</h2>
    </div>
  );
}

export default App;
