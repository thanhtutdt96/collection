import { Dispatch, FC, SetStateAction } from 'react';
import logo from 'assets/logo.png';
import { DisplayMode } from 'types/Product';

interface Props {
  displayMode: DisplayMode;
  setDisplayMode: Dispatch<SetStateAction<DisplayMode>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  searchTerm: string;
}

const navbarItems = [
  {
    label: 'Default',
    value: DisplayMode.DEFAULT,
  },
  {
    label: 'Off-White',
    value: DisplayMode.OFF_WHITE,
  },
  {
    label: 'Louis Vuitton',
    value: DisplayMode.LOUIS_VUITTON,
  },
  {
    label: 'Shippable to UK',
    value: DisplayMode.UK_SHIPPABLE,
  },
  {
    label: 'Display deposited',
    value: DisplayMode.DISPLAY_DEPOSITED,
  },
];

const Navbar: FC<Props> = ({ displayMode, setDisplayMode, searchTerm, setSearchTerm }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <button className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {navbarItems.map((item, index) => (
              <li key={index}>
                <button
                  className={displayMode === item.value ? 'active' : ''}
                  onClick={() => setDisplayMode(item.value)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="btn btn-ghost normal-case text-lg">
          <img className="w-6 mr-2" src={logo} alt="Collection" />
          Collection
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navbarItems.map((item, index) => (
            <li key={index}>
              <button
                className={displayMode === item.value ? 'active' : ''}
                onClick={() => setDisplayMode(item.value)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <input
          value={searchTerm}
          type="text"
          placeholder="Search collection..."
          className="input input-bordered max-w-xs input-sm"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Navbar;
