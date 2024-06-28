import React from "react";

const Content = ({children}) => {
  return (
    <>
      <main className="flex-1 p-4 h-screen">
        {/* <h1 className="text-2xl font-bold">Dashboard Content</h1> */}
        <div className="bg-slate-200 p-6 mt-4 min-h-screen">{children}</div>
      </main>
    </>
  );
};

export default Content;
