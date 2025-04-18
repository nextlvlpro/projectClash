import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import axios from "axios";
import getErrorMessage from "../../utils/getErrorMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  playerApiKey: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  playerApiKey?: string;
}

export default function Register() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    playerApiKey: "",
  });
  const navigate = useNavigate()
  const {user,setUser} = useUser()
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateForm(form);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
        try {
            const response = await axios.post("/api/auth/register", form)
            console.log("Registration Success")
            toast.success("Registration successful!")
            setUser(response.data.user)
            navigate(-1)
                 
        } catch (error) {
            const errMsg = getErrorMessage(error)
            
            toast.error(errMsg)
        }
    }

    
  }

  function validateForm(form: FormState): FormErrors {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Username is required.";
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  }

  if (user) {
    navigate(-1)
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text ">
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
            name="name"
            id="name"
            placeholder="name"
            value={form.name}
            onChange={handleChange}
            className="w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <Input
            type="text"
            name="playerApiKey"
            id="playerApiKey"
            placeholder="Player API Key"
            value={form.playerApiKey}
            onChange={handleChange}
            className="w-full"
          />
          {errors.playerApiKey && <p className="text-red-500 text-sm">{errors.playerApiKey}</p>}

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
