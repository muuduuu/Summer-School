import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center fixed top-0 left-0 w-full shadow-md">
      <ul className="flex space-x-6 mr-4">
        <li>
          <a href="/about" className="hover:underline">About</a>
        </li>
        <li>
          <a href="/acm" className="hover:underline">ACM Student Chapter</a>
        </li>
        <li>
          <a href="/register" className="hover:underline">Register Now</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
