import React from "react"
import logoDark from "./logo-dark.svg"
import logoLight from "./logo-light.svg"
import { NavLink } from "react-router"

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-125 max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="max-w-75 w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              What&apos;s up?
            </p>
            <ul>
              <li>
                <NavLink to="/items" className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                  >
                    <path
                      d="M2.5 4.16699H17.5M2.5 10.0003H17.5M2.5 15.8337H17.5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  View Items
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  )
}
