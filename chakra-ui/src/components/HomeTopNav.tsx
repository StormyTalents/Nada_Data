import { ArrowRightIcon } from "@heroicons/react/solid";
import { Instagram, Twitter } from "@material-ui/icons";
import React, { useEffect, useRef, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeProfileMenu from "../common/menus/HomeProfileMenu";
import { useUserContext } from "../user/UserContext";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";

const StyledDiv = styled.div``;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const HomeTopNav: React.FC<{}> = ({}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user } = useUserContext();

  return (
    <StyledDiv>
      <div className="w-full">
        <Transition.Root show={showMobileMenu} as={Fragment}>
          <Dialog
            as="div"
            className="fixed p-4 inset-0 flex z-40 lg:hidden"
            onClose={setShowMobileMenu}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-white bg-opacity-100" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex flex-col w-full pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 pt-4 ">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-black"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src={"/assets/images/haven_black_logo.png"}
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    <ul className="flex flex-col justify-center items-start font-bold w-full px-4 my-10">
                      <li className="my-3 text-xl uppercase">
                        <Link to="/opportunities">Find Jobs</Link>
                      </li>
                      <li className="my-3 text-xl uppercase">
                        <Link to="/about">Why haven</Link>
                      </li>
                      <li className="my-3 text-xl uppercase">
                        {" "}
                        <Link to="/articles">Learn</Link>
                      </li>

                      {!user && (
                        <>
                          <li className="my-3 text-xl uppercase">
                            <Link to="/login">Log In</Link>
                          </li>
                          <li className="my-3 text-xl uppercase">
                            <Link to="/signup">
                              <button className=" flex justify-center items-center py-1 h-10">
                                <span className="font-bold uppercase">
                                  Sign up for free
                                </span>{" "}
                                <ArrowRightIcon className="w-4 h-4 ml-1" />{" "}
                              </button>
                            </Link>
                          </li>
                        </>
                      )}
                      {user && <HomeProfileMenu />}
                    </ul>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}

        <div className="flex flex-col flex-1 w-full">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16  justify-center items-center">
            <button
              type="button"
              className="md:hidden left-0 absolute  text-black bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              onClick={() => setShowMobileMenu(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6 text-black" aria-hidden="true" />
            </button>
            <div className="md:hidden">
              <Link to="/">
                <img
                  className="h-8 w-auto"
                  src="/assets/images/haven_black_logo.png"
                />
              </Link>
            </div>
            <div className="hidden md:flex justify-between items-center w-full">
              <div>
                <Link to="/">
                  <img
                    className="h-8 w-auto"
                    src="/assets/images/haven_black_logo.png"
                  />
                </Link>
              </div>
              <nav>
                <ul className="flex justify-center items-center font-bold">
                  <li className="mx-3">
                    <Link to="/opportunities">Find Jobs </Link>
                  </li>
                  <li className="mx-3">
                    <Link to="/about">Why haven</Link>
                  </li>
                  <li className="mx-3">
                    {" "}
                    <Link to="/articles">Learn</Link>
                  </li>

                  {!user && (
                    <>
                      <li className="ml-10">
                        <Link to="/login">Log In</Link>
                      </li>
                      <li className="ml-3">
                        <Link to="/signup">
                          <button className="rounded-full border-black border flex justify-center items-center py-1 h-10 w-40">
                            <span className="font-bold">Sign up for free</span>{" "}
                            <ArrowRightIcon className="w-4 h-4 ml-1" />{" "}
                          </button>
                        </Link>
                      </li>
                    </>
                  )}
                  {user && <HomeProfileMenu />}
                </ul>

                <div className="burger-box relative justify-center items-center flex xl:hidden">
                  <button
                    type="button"
                    className={classNames(
                      showMobileMenu ? "burger--active" : "",
                      "header-burger menu-overlay-has-visible-non-navigation-items w-full h-full"
                    )}
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                  >
                    <span className="sr-only">Open main menu </span>

                    <div className="top-bun top-0 left-0 bottom-0 absolute w-full m-auto block"></div>
                    <div className="patty top-0 left-0 bottom-0 absolute w-full m-auto block"></div>
                    <div className="bottom-bun top-0 left-0 bottom-0 absolute w-full m-auto block"></div>
                  </button>
                </div>

                {showMobileMenu && (
                  <div
                    className="min-h-screen z-50  border-b border-gray-200 lg:hidden flex flex-col justify-evenly items-center absolute w-full "
                    id="mobile-menu"
                  >
                    <div className="flex flex-col justify-evenly items-center h-full ">
                      <div className="layout-header-menu-nav-item relative block bg-transparent opacity-100">
                        <Link
                          className="font-light leading-normal tracking-normal"
                          to="/"
                        >
                          Home
                        </Link>
                      </div>

                      <div className="block lg:hidden lg:ml-auto absolute bottom-20">
                        <div className="flex items-center layout-home-links">
                          <Instagram className="layout-instagram-icon mx-6" />
                          <Twitter className="layout-twitter-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default HomeTopNav;
