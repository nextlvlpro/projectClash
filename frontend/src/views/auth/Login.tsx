import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import axios from "axios";
import getErrorMessage from "../../utils/getErrorMessage";
import { toast } from "react-toastify";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const {setUser, user} = useUser()
  const navigate = useNavigate()
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", form);
      console.log("Login Success");
      setUser(response.data.user)
      navigate(-1)
      toast.success("Login successful!")
    } catch (error: any) {
      let errMsg = getErrorMessage(error)
      console.log(errMsg);
      toast.error(errMsg)
    } finally {
      setLoading(false);
    }
  }

  function validateForm(data: { email: string; password: string }) {
    const errors: { email?: string; password?: string } = {};
    if (!data.email) errors.email = "Email is required";
    if (!data.password) errors.password = "Password is required";
    return errors;
  }

  if (user) { 
    setTimeout(() => {
      navigate(-1)
    }, 1000)

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg mx-auto h-[60vh]"
      >
        <h2 className="text-2xl font-bold text-center text-primary">You are already logged in</h2>
      </motion.div>
    )
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-primary">Login</h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <Button variant="primary" size="lg" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account? <a href="/register" className="text-accent hover:underline">Register</a>
        </p>
      </motion.div>
    </div>
  );
}
