import React, { useState } from "react";
import LoginPageRightSection from "../components/ui/LoginPageRightSection";

const TeamFlowSignUp = () => {
  const [signupCreds, setSignupCreds] = useState({});
  const signupHandler = async () => {};
  return (
    <div className="flex min-h-screen w-full font-sans text-gray-800">
      {/*SignUp Form (Left-Section) */}
      <div className="flex w-full flex-col justify-center bg-white px-8 md:w-1/2 lg:px-24 xl:px-32">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo & Header */}
          <div className="mb-4">
            <img
              src="teamflow.png"
              alt="TeamFlow Logo"
              className="mb-4 h-12 w-40 object-contain "
            />
            <h1 className="text-3xl font-medium text-[#172b4d]">Sign up</h1>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Name Field */}
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-600"
              >
                Name
              </label>
              <input
                type="email"
                id="email"
                placeholder="aditya"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

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
                Set Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#0052cc] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0043a6] focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:ring-offset-2"
              >
                Request SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
      <LoginPageRightSection />
    </div>
  );
};

export default TeamFlowSignUp;
