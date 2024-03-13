import { Link, NavLink } from "react-router-dom";
import cx from "classnames";
import useProjectList from "../hooks/useProjectList";
import { ComponentProps } from "react";
import { useToggle } from "usehooks-ts";
import IconCross from "../icons/iconCross";
import IconHamburger from "../icons/iconHamburger";
import CleaningBroom from "../icons/cleaningBroom";

interface ActiveNavLinkProps extends ComponentProps<typeof NavLink> {}

const ActiveNavLink = (props: ActiveNavLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) => {
        return cx(
          "text-white px-3 py-2 sm:rounded-md text-sm font-medium w-full sm:w-fit text-center sm:text-left",
          isActive ? "bg-gray-900" : "bg-transparent"
        );
      }}
      {...props}
    />
  );
};

const CancellationLink = (props: { count: number }) => {
  return (
    <NavLink
      to="/cancellation-list"
      className="text-gray-300 bg-gray-950 hover:bg-gray-700 hover:text-white px-3 py-3 sm:py-2 mr-2 sm:ml-0 rounded-2xl text-sm font-medium shadow-gray-900 shadow-md relative"
    >
      <span className="hidden sm:block">Cancellation</span>
      <span className="block sm:hidden">
        <CleaningBroom />
      </span>
      {props.count ? (
        <span className="inline-flex ml-2 h-5 w-5 items-center justify-center px-1 py-1 text-xs font-medium leading-none text-red-100 bg-red-600 circle absolute -top-1 -right-1 rounded-full">
          {props.count}
        </span>
      ) : null}
    </NavLink>
  );
};

const Navbar = () => {
  const { count } = useProjectList();
  const [isOpen, toggle, setIsOpen] = useToggle();

  return (
    <nav className="bg-gray-800 w-full fixed z-50">
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-auto">
              <div className="flex space-x-4">
                <ActiveNavLink to="/">Projects</ActiveNavLink>
                <ActiveNavLink to="/client-list">Clients</ActiveNavLink>
                <CancellationLink count={count} />
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggle}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <IconHamburger /> : <IconCross />}
            </button>
            <CancellationLink count={count} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="w-full flex flex-col sm:hidden shadow-gray-800 shadow-sm">
          <div className="w-full flex flex-center">
            <ActiveNavLink to="/">Projects</ActiveNavLink>
          </div>
          <div className="w-full flex flex-center">
            <ActiveNavLink to="/client-list">Clients</ActiveNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
