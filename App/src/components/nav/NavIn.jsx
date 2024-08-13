import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavIn() {
    
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    localStorage.removeItem('authuser');
    navigate('/signin');
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

 
  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleChangePassword = () => {
    navigate('/home/changepassword');
  };

  const authUser = JSON.parse(localStorage.getItem('authuser')) || {};

  return (
    <div className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-28">
        {/* Title */}
        <div className="text-white text-xl md:text-2xl font-bold">
          MyTodos
        </div>

        {/* Buttons */}
        <div className="space-x-2 md:space-x-5 flex items-center">
          <button
            onClick={handleProfileClick}
            className="text-white text-lg md:text-xl focus:outline-none text-yellow-700 bg-white px-2 py-1 rounded-full"
          >
            <i className="fas fa-user-circle"></i>
          </button>
          <button
            onClick={handleLogout}
            className="bg-white text-black-600 font-semibold py-2 px-3 md:px-4 rounded hover:bg-gray-100 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          style={{ zIndex: 2000 }}
        >
          <div
            className="bg-white p-4 md:p-6 rounded shadow-lg w-full max-w-sm md:max-w-md"
            style={{ zIndex: 1001 }}
          >
            <h3 className="text-lg md:text-xl font-semibold mb-4">Profile</h3>
            <div className="flex items-center mb-4">
              <i className="fas fa-user-circle text-3xl md:text-4xl mr-4"></i>
              <div>
                <p className="text-lg font-bold">{authUser.name}</p>
                <p className="text-gray-600">{authUser.email}</p>
              </div>
            </div>
            <button
              onClick={handleChangePassword}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Change Password
            </button>
            <button
              onClick={handleCloseProfileModal}
              className="mt-4 text-gray-600 w-full text-left"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavIn;


























// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function NavIn() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('authtoken');
//         localStorage.removeItem('authuser');
//         navigate('/signin');
//     };

//     const handleProfileClick = () => {
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     const handleChangePassword = () => {
//         navigate('/home/changepassword');
//     };

//     const authUser = JSON.parse(localStorage.getItem('authuser')) || {};

//     return (
//         <div className="bg-blue-600 p-4">
//             <div className="container mx-auto flex justify-between items-center px-4 md:px-28">
//                 {/* Title */}
//                 <div className="text-white text-xl md:text-2xl font-bold">
//                     MyApp
//                 </div>

//                 {/* Buttons */}
//                 <div className="space-x-2 md:space-x-5 flex items-center">
//                     <button
//                         onClick={handleProfileClick} 
//                         className="text-white text-lg md:text-xl focus:outline-none text-yellow-700 bg-white px-2 py-1 rounded-full"
//                     >
//                         <i className="fas fa-user-circle"></i>
//                     </button>
//                     <button 
//                         onClick={handleLogout} 
//                         className="bg-white text-black-600 font-semibold py-2 px-3 md:px-4 rounded hover:bg-gray-100 transition duration-200"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>

//             {/* Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
//                     <div className="bg-white p-4 md:p-6 rounded shadow-lg w-full max-w-sm md:max-w-md">
//                         <h3 className="text-lg md:text-xl font-semibold mb-4">Profile</h3>
//                         <div className="flex items-center mb-4">
//                             <i className="fas fa-user-circle text-3xl md:text-4xl mr-4"></i>
//                             <div>
//                                 <p className="text-lg font-bold">{authUser.name}</p>
//                                 <p className="text-gray-600">{authUser.email}</p>
//                             </div>
//                         </div>
//                         <button 
//                             onClick={handleChangePassword}
//                             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
//                         >
//                             Change Password
//                         </button>
//                         <button 
//                             onClick={handleCloseModal} 
//                             className="mt-4 text-gray-600 w-full text-left"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default NavIn;
