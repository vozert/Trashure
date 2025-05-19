import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { DATA_NAVBARS } from "../utils/data";

export default function NavLinks({ isMobile = false }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <ul
      className={`flex ${
        isMobile ? "flex-col gap-y-8 pb-6" : "gap-x-8 p-2 ml-8"
      } text-base font-semibold text-white-1`}
    >
      {DATA_NAVBARS.map((item) => {
        const isActive = !isAuthPage && item.active;
        return (
          <li key={item.id}>
            {item.link.startsWith("#") ? (
              <HashLink
                smooth
                to={`/${item.link}`}
                className={`hover:text-green-2 hover:underline underline-offset-2 transition-all duration-200 ${
                  isActive ? "text-green-2 underline underline-offset-2" : ""
                }`}
              >
                {item.title}
              </HashLink>
            ) : (
              <Link
                to={item.link === "#home" ? "/" : item.link}
                className={`hover:text-green-2 hover:underline underline-offset-2 transition-all duration-200 ${
                  isActive ? "text-green-2 underline underline-offset-2" : ""
                }`}
              >
                {item.title}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}