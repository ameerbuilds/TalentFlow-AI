import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl"
    >
      <h1 className="text-4xl font-bold text-center text-cyan-400">
        TalentFlow AI
      </h1>

      <p className="text-slate-400 text-center mt-3">
        Enterprise Recruitment Management Platform
      </p>

      <form className="mt-8 space-y-5">

        {/* Email */}

        <div>

          <label className="block text-sm text-slate-300 mb-2">
            Email Address
          </label>

          <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">

            <FaEnvelope className="text-cyan-400" />

            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent w-full outline-none text-white placeholder:text-slate-500"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="block text-sm text-slate-300 mb-2">
            Password
          </label>

          <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">

            <FaLock className="text-cyan-400" />

            <input
              type="password"
              placeholder="Enter your password"
              className="bg-transparent w-full outline-none text-white placeholder:text-slate-500"
            />

          </div>

        </div>

        <div className="flex items-center justify-between text-sm">

          <label className="flex items-center gap-2 text-slate-400">

            <input type="checkbox" />

            Remember Me

          </label>

          <Link
            to="#"
            className="text-cyan-400 hover:text-cyan-300"
          >
            Forgot Password?
          </Link>

        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl transition-all duration-300"
        >
          Sign In
        </button>

        <p className="text-center text-slate-400">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-cyan-400 hover:text-cyan-300"
          >
            Register
          </Link>

        </p>

      </form>

    </motion.div>
  );
}