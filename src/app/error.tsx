"use client";

import React from "react";

const Error = ({ reset }: { reset: () => void }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 mt-6 rounded shadow-md max-w-md mx-auto">
      <h3 className="font-bold py-4 pl-2">エラーが発生しました。</h3>
      <div className="text-sm pl-2">
        <button
          onClick={() => reset()}
          className="bg-red-600 text-white px-2 py-2 mb-2 rounded hover:bg-red-500 transition duration-100"
        >
          もう一度試す
        </button>
      </div>
    </div>
  );
};

export default Error;
