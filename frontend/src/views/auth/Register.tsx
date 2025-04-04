import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    playerApiKey: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-primary">Create an Account</h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="playerApiKey"
            id="playerApiKey"
            placeholder="Player API Key"
            value={form.playerApiKey}
            onChange={handleChange}
          />


          <Button variant="primary" size="lg" className="w-full">
            Register
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-accent hover:underline">Login</a>
        </p>
      </motion.div>
    </div>
  );
}
