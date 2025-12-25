import { useState } from "react";
import { login } from "../services/api";

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await login(email, password);
    localStorage.setItem("token", data.access_token);
    onLogin();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 p-6 bg-white shadow rounded space-y-3"
    >
      <h2 className="text-xl font-bold">Login</h2>

      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-purple-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>
      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <button
          type="button"
          className="text-blue-600"
          onClick={onSwitchToRegister}
        >
          Register
        </button>
      </p>

    </form>
  );
}

export default Login;
