import React, { useState } from "react";
import LoginPageRightSection from "../components/ui/LoginPageRightSection";
import axios from "axios";

const TeamFlowLogin = () => {
  const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!loginCreds.email || !loginCreds.password) {
      console.log("provide email or password !");
      return;
    }

    try {
      const response = await axios.post(
        "https://teamflow-1tzb.onrender.com/login",
        {
          email: loginCreds.email,
          password: loginCreds.password,
        },
      );

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Failed to send string:", error.message);
    }
  };

  const keyHandler = async (e) => {
    if (e.key == "Enter") return await loginHandler(e);
  };

  return (
    <div className="flex min-h-screen w-full font-sans text-gray-800">
      {/*Login Form (Left-Section) */}
      <div className="flex w-full flex-col justify-center bg-white px-8 md:w-1/2 lg:px-24 xl:px-32">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo & Header */}
          <div className="mb-6 gap-4 flex">
            <h1 className="text-3xl font-medium text-[#172b4d]">Welcome to</h1>
            <img
              src="teamflow.png"
              alt="TeamFlow Logo"
              className="mb-4 h-12 w-40 object-contain border-b border-gray-400 "
            />
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-600"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={loginCreds.email}
                onChange={(e) =>
                  setLoginCreds({ ...loginCreds, email: e.target.value })
                }
                placeholder="aditya34@gmail.com"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={loginCreds.password}
                onKeyDown={(e) => keyHandler(e)}
                onChange={(e) =>
                  setLoginCreds({ ...loginCreds, password: e.target.value })
                }
                placeholder="Enter password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Keep me sign in
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-[#0052cc] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                onSubmit={(e) => loginHandler(e)}
                className="flex w-full justify-center rounded-md bg-[#0052cc] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0043a6] focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Footer Text */}
          <p className="mt-8 text-sm text-gray-500">
            Not a member? To request an account, please contact your{" "}
            <a
              href="#"
              className="font-semibold text-[#0052cc] hover:underline"
            >
              TeamFlow administrators.
            </a>
          </p>
        </div>
      </div>
      <LoginPageRightSection />
    </div>
  );
};

export default TeamFlowLogin;
