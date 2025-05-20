import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    // TODO: Add your login logic here
    alert("Login berhasil (dummy)!");
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-white-2 py-12 font-inter">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Masuk ke Trashure</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            autoComplete="current-password"
            required
          />
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <Button
            type="submit"
            variant="secondary"
            size="md"
            className="w-full"
          >
            Masuk
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link to="/register" className="text-green-1 underline">
            Daftar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;