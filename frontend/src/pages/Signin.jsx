import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/signin", {
        email: formData.email,
        password: formData.password,
      });

      // Handle successful login
      if (response.data.success) {
        // Save token to localStorage
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="h-auto w-[800px] bg-white flex rounded-lg shadow-lg">
        {/* Left Section - Video Background */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-blue-600">
          <div className="absolute inset-0 z-10 bg-blue-600 bg-opacity-20" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
            src="./video.mp4"
          >
            <img
              src="video.mp4"
              alt="Learning background"
              className="object-cover"
            />
          </video>
          <div className="relative z-20 flex flex-col justify-center items-center h-full text-white p-6">
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <p className="text-center mb-6">Continue your learning journey</p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col items-center justify-center bg-white rounded-r-lg">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Sign in to your account
          </h1>
          <p className="text-gray-600 mb-8 lg:hidden">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign up
            </Link>
          </p>

          {error && (
            <div className="w-full p-3 mb-4 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded pr-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-600">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center gap-2"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  <LogIn size={18} /> Sign in
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="mb-4">
              Don't have an account yet?  <Link to="/signup">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
