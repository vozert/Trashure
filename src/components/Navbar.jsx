import { useState } from "react";
import logowhite from "../assets/pastilaris-logo-white.svg";
import Button from "./Button";
import { DATA_NAVBARS } from "../utils/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine =
    "h-[2px] w-full my-1 rounded-full bg-white-2 transition ease-in-out transform duration-300";

  const renderNavLinks = (isMobile = false) => (
    <ul
      className={`flex ${
        isMobile ? "flex-col gap-y-8 pb-6" : "gap-x-8 p-2 ml-8"
      } text-base font-semibold text-white-1`}
    >
      {DATA_NAVBARS.map((item) => (
        <li key={item.id}>
          <a
            href={item.link}
            className={`hover:text-green-2 hover:underline underline-offset-2 transition-all duration-200 ${
              item.active
                ? "text-green-2 underline underline-offset-2"
                : ""
            }`}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="bg-white-2 p-2 lg:py-8">
      <div className="relative bg-green-1 py-5 md:px-8 px-6 container mx-auto rounded-full flex items-center justify-between lg:divide-x-2 divide-green-3">
        <a href="#" className="mr-8">
          <img src={logowhite} alt="Pastilaris Logo" className="w-36 md:w-40" />
        </a>
        <div className="hidden lg:block w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <nav className="hidden lg:block">{renderNavLinks(false)}</nav>
            </div>
            <div className="hidden lg:block">
              <div className="flex gap-x-3">
                <Button variant="white" size="md">
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* MobileNav */}
        <button
          className="group flex flex-col lg:hidden w-7 h-8 justify-center items-center"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <div
            className={`${genericHamburgerLine} ${
              isOpen
                ? "rotate-45 translate-y-3 opacity-100 group-hover:opacity-80"
                : "opacity-100 group-hover:opacity-80"
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              isOpen ? "opacity-0" : "opacity-100 group-hover:opacity-80"
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              isOpen
                ? "-rotate-45 -translate-y-2 opacity-100 group-hover:opacity-80"
                : "opacity-100 group-hover:opacity-80"
            }`}
          />
        </button>

        <div
          className={`absolute top-[5.250rem] left-0 lg:hidden bg-green-1 px-6 py-8 rounded-lg w-full transition-all duration-300 transform ${
            isOpen
              ? "translate-y-0 opacity-100 ease-in-out"
              : "-translate-y-[200%] opacity-0 ease-in-out"
          }`}
        >
          <nav className="w-full" data-navbar>
            {renderNavLinks(true)}
          </nav>
          <div className="lg:hidden">
            <div className="flex flex-col gap-y-3">
              <Button variant="white" size="md">
                Login
              </Button>
            </div>
          </div>
          <footer className="pt-6">
            <p className="text-white-2 text-xs text-center">
              &copy; {new Date().getFullYear()} PastiLaris. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </header>
  );
}