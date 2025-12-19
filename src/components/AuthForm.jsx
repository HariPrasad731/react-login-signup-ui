import { useState } from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    // ✅ FIXED EMAIL VALIDATION
    const email = form.email.trim();

    if (!email) {
      err.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.email = "Invalid email format";
    }

    if (!form.password) {
      err.password = "Password is required";
    } else if (form.password.length < 6) {
      err.password = "Minimum 6 characters required";
    }

    if (!isLogin) {
      if (!form.name) {
        err.name = "Name is required";
      }

      if (!form.confirmPassword) {
        err.confirmPassword = "Confirm your password";
      } else if (form.password !== form.confirmPassword) {
        err.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`${isLogin ? "Login" : "Signup"} successful (frontend only)`);
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Sign In" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <InputField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />
          )}

          <InputField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          {!isLogin && (
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }}
            className="text-blue-600 ml-1 font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
