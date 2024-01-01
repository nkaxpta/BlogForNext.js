"use client";

import React, { useEffect } from "react";
import tocbot from "tocbot";

const Outline = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".body",
      headingSelector: "h2, h3, h4, h5",
      scrollSmoothOffset: -60,
      headingsOffset: 80,
      scrollSmoothDuration: 300,
    });

    return () => tocbot.destroy();
  }, []);
  return (
    <aside>
      <div className="bg-gray-100 px-4 pt-4 pb-1 mb-6 mt-3 sm:mx-6 md:mr-10 rounded-lg">
        <h3 className="text-gray-800 border-b-4">Index</h3>
        <div className="flex-wrap gap-4">
          <nav className="toc" />
        </div>
      </div>
    </aside>
  );
};

export default Outline;
