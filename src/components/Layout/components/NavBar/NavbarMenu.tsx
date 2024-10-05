import React, { useState } from 'react';

const NavbarMenu = () => {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  return (
    <div className="flex justify-between p-4 bg-white">
      {/* Actions */}
      <div className="flex space-x-4">

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
            className="p-1 bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
          >
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </button>
          {isAvatarOpen && (
            <div className="absolute right-0 mt-3 bg-white rounded-md shadow-lg min-w-max">
              <ul className="flex flex-col p-2 my-3 space-y-3">
                <li>
                  <button className="flex items-start px-2 py-1 space-x-2 rounded-md hover:bg-gray-100">
                    <span className="block mt-1">
                      <svg
                        className="w-6 h-6 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.121 17.804A1.5 1.5 0 116.293 19.67m11.086-1.866a1.5 1.5 0 111.172 2.757M12 7.25a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0 0v7.75m-9 4h9m0 0h9m0 0H3"
                        />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-lg">Configuración</span>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;
