import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-gray-700 mt-8">
      <footer className="py-5 px-10 border-t-2 text-gray-200 text-center">
        <small>&copy; 2023 - {year} Math teacher Engineer Blog</small>
      </footer>
    </div>
  );
};

export default Footer;
