import Link from 'next/link'
import { useState } from 'react'
import { RiMenuFill } from 'react-icons/ri'

export default function () {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNav = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="w-full border-b border-gray-100 bg-white py-4">
        <div className="mx-auto px-5 md:container lg:px-40">
          <div className="flex items-center justify-between">
            <div>
              <Link href="https://jsenyitko.tech/">
                <p className="hover:cursor-pointer">
                  <span className="text-lg font-bold">Jack</span>
                  <span className="text-lg font-bold text-blue-700">
                    Senyitko
                  </span>
                </p>
              </Link>
            </div>
            <div className="hidden space-x-8 font-semibold md:flex">
              <a
                className="text-gray-600 hover:text-gray-400"
                href="https://jsenyitko.tech/"
              >
                Home
              </a>
              <a
                className="text-gray-600 hover:text-gray-400"
                href="https://jsenyitko.tech/#about"
              >
                About
              </a>
              <a
                className="text-gray-600 hover:text-gray-400"
                href="https://jsenyitko.tech/#projects"
              >
                Projects
              </a>
              <a
                className="text-gray-600 hover:text-gray-400"
                href="https://docs.google.com/document/d/1BDldcHU0B3w5CL04zndtVJ3k59d3O5rRaMFugWvD3vI/edit?usp=sharing"
              >
                Resume
              </a>
            </div>
            <div className="md:hidden">
              <RiMenuFill
                size={26}
                onClick={toggleNav}
                className="text-gray-600 hover:cursor-pointer hover:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className=" flex flex-col space-y-8 border-b border-gray-100 bg-white p-8 font-semibold text-gray-600">
          <a className="hover:text-gray-400" href="https://jsenyitko.tech/">
            Home
          </a>
          <a
            className="hover:text-gray-400"
            href="https://jsenyitko.tech/#about"
          >
            About
          </a>
          <a
            className="hover:text-gray-400"
            href="https://jsenyitko.tech/#projects"
          >
            Projects
          </a>
          <a
            className="hover:text-gray-400"
            href="https://docs.google.com/document/d/1BDldcHU0B3w5CL04zndtVJ3k59d3O5rRaMFugWvD3vI/edit?usp=sharing"
          >
            Resume
          </a>
        </div>
      )}
    </>
  )
}
