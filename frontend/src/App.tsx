// pages/RegisterPage.tsx
import React, { useState } from "react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export function App() {
  const { registerUser, loading, error, success } = useAuthStore();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(formData);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Registrar Novo Usuário</h2>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {success && <div style={{ color: "green" }}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}

export default App;
