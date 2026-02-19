import AnimatedBorder from "../components/AnimatedBorder";
import { Link } from "react-router-dom";
import {
  MessageCircleIcon,
  MailIcon,
  LockIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function Example() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signup(formData);
  };
  return (
    <AnimatedBorder duration="4s" className="p-6 w-2/3 min-h-[80vh] absolute">
      <div className="flex">
        <div className="w-[50%]">
          <div className="text-center mb-8">
            <MessageCircleIcon className="h-10 w-10 mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-200 mb-2">
              Create Account
            </h2>
            <p className="text-slate-400">Sign up for a new account</p>
          </div>
          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* FULL NAME */}
            <div>
              <label className=" block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5;" />

                <input
                  type="text"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="John Doe"
                  value={formData?.fullname}
                  onChange={(e) => {
                    setFormData({ ...formData, fullname: e.target.value });
                  }}
                />
              </div>
            </div>

            {/* EMAIL INPUT */}
            <div>
              <label className=" block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5;" />

                <input
                  type="email"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="johndoe@gmail.com"
                  value={formData?.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className=" block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5;" />

                <input
                  type="password"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter your password"
                  value={formData?.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              className="w-full bg-cyan-500 text-white rounded-lg py-2.5 font-medium hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500"
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <LoaderIcon className="w-full h-5 animate-spin text-center" />
              ) : (
                "Create Account"
              )}
            </button>
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className=" px-4 py-2 inline-block bg-cyan-500/10 rounded-lg text-cyan-400 hover:text-cyan-500 text-sm transition-colors"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
        <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-linear-to-bl from-slate-800/20 to-transparent">
          <div>
            <img
              src="/signup.png"
              alt="People using mobile devices"
              className="w-full h-auto object-contain"
            />
            <div className="mt-6 text-center">
              <h3 className="text-xl font-medium text-cyan-400">
                Start Your Journey Today
              </h3>

              <div className="mt-4 flex justify-center gap-4">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300">
                  Free
                </span>
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300">
                  Easy Setup
                </span>
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300">
                  Private
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBorder>
  );
}
