import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BiTask, BiLogOut, BiLogIn, BiAddToQueue } from 'react-icons/bi';

const NavBar = () => {
   const { users, isAuthenticated, logout } = useContext(AuthContext);

   return (
      <nav className="bg-gray-600 border-gray-200 rounded shadow ">
         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div>
               <Link to={isAuthenticated ? '/tasks' : '/'}>
                  <span className="flex items-center gap-2 self-center text-2xl font-semibold whitespace-nowrap ">
                     <BiTask />
                     Manager Task
                  </span>
               </Link>
            </div>
            <div>
               {isAuthenticated && (
                  <span>
                     <span>Welcome {users?.username}</span>
                  </span>
               )}
            </div>
            <div>
               <ul className="flex gap-5 ">
                  {isAuthenticated ? (
                     <>
                        <li>
                           <Link
                              to="/new-task"
                              className="hover:text-gray-400 flex items-center gap-2"
                           >
                              <BiAddToQueue />
                              Add new task
                           </Link>
                        </li>
                        <li>
                           <Link
                              to="/"
                              onClick={logout}
                              className="hover:text-gray-400 flex items-center gap-2"
                           >
                              <BiLogOut />
                              Logout
                           </Link>
                        </li>
                     </>
                  ) : (
                     <>
                        <li>
                           <Link
                              to="/login"
                              className="hover:text-gray-400 flex items-center gap-2"
                           >
                              <BiLogIn />
                              Login
                           </Link>
                        </li>
                        <li>
                           <Link to="/register" className="hover:text-gray-400">
                              Register
                           </Link>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
