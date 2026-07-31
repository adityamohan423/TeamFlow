import React from "react";

const LoginPageRightSection = () => {
  return (
    <div className="relative hidden w-1/2 flex-col items-center justify-between bg-[#0052cc] py-12 md:flex">
      {/* Top Spacer */}
      <div className="flex-1"></div>

      {/* Abstract Illustration Placeholder */}
      {/* Replace this div with an actual SVG or image if you have the specific graphic */}
      <div className="relative flex h-80 w-full max-w-lg items-center justify-center">
        <div className="absolute grid grid-cols-3 gap-6 opacity-90">
          {/* Mock Kanban Boards */}
          <div className="h-64 w-32 rounded-lg bg-blue-400 shadow-lg"></div>
          <div className="h-64 w-32 rounded-lg bg-blue-400 shadow-lg mt-8"></div>
          <div className="h-64 w-32 rounded-lg bg-blue-400 shadow-lg"></div>
        </div>
        {/* Mock Interactive Card */}
        <div className="absolute z-10 h-24 w-64 rounded-lg bg-green-400 shadow-2xl flex items-center px-4">
          <div className="h-4 w-32 rounded bg-white/70"></div>
          <div className="ml-auto h-8 w-8 rounded-full bg-white/70"></div>
        </div>
      </div>

      {/* Bottom Spacer & Link */}
      <div className="flex-1 flex flex-col justify-end pb-8">
        <p className="text-sm text-white font-medium">
          New to TeamFlow? Check out the{" "}
          <a href="#" className="underline hover:text-gray-200">
            TeamFlow User's Guide.
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPageRightSection;
