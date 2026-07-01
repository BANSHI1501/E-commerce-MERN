import React, { useContext, useState } from "react";

import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };
  return (
    <header className="fixed z-40 w-full h-20 bg-white shadow-md">
      <div className="container flex items-center justify-between h-full px-8 mx-auto ">
        <div className="">
          <Link to={"/"} className="text-2xl font-bold tracking-wide text-blue-500">
            Bhola Enterprises
          </Link>
        </div>


        <div className="items-center justify-between hidden w-full max-w-sm pl-4 border lg:flex rounded-xl focus-within:shadow">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-xl text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="relative flex justify-center text-3xl cursor-pointer"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                <Link to={"/profile"} className="text-2xl font-bold tracking-wide text-blue-500">
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="w-10 h-10 rounded-full"
                      alt={user?.name}
                    />
                  ) : (
                    <FaRegCircleUser />
                  )}
                </Link>
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bottom-0 p-2 bg-white rounded shadow-lg top-11 h-fit">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="hidden p-2 whitespace-nowrap md:block hover:bg-slate-100"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="relative text-2xl">
              <span>
                <FaShoppingCart />
              </span>

              <div className="absolute flex items-center justify-center w-5 h-5 p-1 text-white bg-blue-600 rounded-xl -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-white bg-blue-600 rounded-xl hover:bg-blue-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
