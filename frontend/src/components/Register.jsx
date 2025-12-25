import { useState } from "react";
import { register } from "../services/api";

function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await register(email, password);
      alert("Registration successful. Please login.");
      onSwitchToLogin();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="max-w-sm mx-auto mt-20 p-6 bg-white shadow rounded space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">Register</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className="border p-2 w-full"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="bg-purple-600 text-white px-4 py-2 rounded w-full">
        Register
      </button>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <button type="button" className="text-blue-600" onClick={onSwitchToLogin}>
          Login
        </button>
      </p>
    </form>
  );
}

export default Register;
