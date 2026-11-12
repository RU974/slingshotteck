import { Logo } from "@/components/Brand";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import { usePage } from "@/lib/page";
import type { NavigationLink } from "@/types";

const isActive = (pathname: string, url: string) => pathname === url || pathname === `${url}/`;

export default function Header() {
  const { pathname } = usePage();
  const { main } = menu as { main: NavigationLink[] };
  const { navigation_button, settings } = config;
  const external = navigation_button.link.startsWith("http");

  return (
    <header className={`header z-50 w-full transition-all duration-300 ${settings.sticky_header ? "fixed top-0" : ""}`}>
      <nav className="navbar container relative z-30">
        {/* logo */}
        <div className="order-0">
          <Logo />
        </div>
        {/* navbar toggler (pure CSS via the hidden checkbox) */}
        <input id="nav-toggle" type="checkbox" className="peer hidden" />
        <label
          htmlFor="nav-toggle"
          className="order-3 cursor-pointer flex items-center lg:hidden text-white lg:order-1 bg-dark/10 backdrop-blur-lg size-12 rounded-xl justify-center"
        >
          <svg id="show-button" className="h-6 fill-current block peer-checked:hidden" viewBox="0 0 20 20">
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
          </svg>
          <svg id="hide-button" className="h-6 fill-current hidden peer-checked:block" viewBox="0 0 20 20">
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            />
          </svg>
        </label>
        <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden peer-checked:flex peer-checked:flex-col lg:flex w-full py-6 max-lg:mt-5 lg:order-1 lg:w-auto lg:gap-x-2 lg:py-0 xl:gap-x-8 bg-light/90 lg:bg-dark/30 backdrop-blur-lg rounded-2xl lg:rounded-full lg:corner-squircle px-6"
        >
          {main.map((item) =>
            item.hasChildren ? (
              <li key={item.name} className="nav-item nav-dropdown group relative">
                <input type="checkbox" id={`submenu-${item.name}`} className="peer hidden lg:hidden" />
                <label
                  htmlFor={`submenu-${item.name}`}
                  className={`nav-link inline-flex items-center ${
                    item.children?.some(({ url }) => isActive(pathname, url)) ? "active" : ""
                  }`}
                >
                  {item.name}
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </label>
                <ul className="nav-dropdown-list hidden peer-checked:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                  {item.children?.map((child) => (
                    <li key={child.url} className="nav-dropdown-item">
                      <a
                        href={child.url}
                        aria-label={child.name}
                        className={`nav-dropdown-link block ${isActive(pathname, child.url) ? "active" : ""}`}
                      >
                        {child.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.name} className="nav-item">
                <a href={item.url} className={`nav-link block ${isActive(pathname, item.url) ? "active" : ""}`}>
                  {item.name}
                </a>
              </li>
            ),
          )}
          {navigation_button.enable && (
            <li className="pt-4 inline-block lg:hidden">
              <a
                className="btn-outline btn-sm"
                href={navigation_button.link}
                target={external ? "_blank" : "_self"}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {navigation_button.label}
              </a>
            </li>
          )}
        </ul>
        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
          {navigation_button.enable && (
            <a
              className="btn btn-primary hidden lg:inline-block"
              href={navigation_button.link}
              target={external ? "_blank" : "_self"}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {navigation_button.label}
            </a>
          )}
        </div>
      </nav>

      {/* expanded menu background */}
      <div className="bg-dark/50 backdrop-blur-sm -z-10" id="nav-menu-bg" />
    </header>
  );
}
