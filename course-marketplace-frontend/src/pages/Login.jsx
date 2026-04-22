import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900 relative overflow-hidden">

      {/* Floating shapes */}
      <div className="absolute w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-3xl top-10 left-10"></div>
      <div className="absolute w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl bottom-10 right-10"></div>

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 text-white border border-white/20">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 placeholder-white focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 placeholder-white focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;