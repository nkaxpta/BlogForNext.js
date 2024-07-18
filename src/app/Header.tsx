import React from "react";
import Link from "next/link";
import { BLOG_TITLE } from "~/constants/constants";

const Header = () => {
  return (
    <div className="sticky top-0 z-50">
      <header className="flex justify-between items-center py-3 px-10 border-b-2 bg-gray-300 bg-opacity-50">
        <h1 className="text-lg">
          <Link href="/">{BLOG_TITLE}</Link>
        </h1>
        <nav className="flex gap-6 text-sm">
          <Link
            href="/Articles/page/1"
            className="hover:text-blue-600 duration-150"
          >
            Articles List
          </Link>
          <Link href="/" className="hover:text-blue-600 duration-150">
            Home
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
