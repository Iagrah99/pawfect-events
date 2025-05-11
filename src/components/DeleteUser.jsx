const DeleteUser = ({toggleDeleteUserModal, handleDeleteUser}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-1 sm:px-0">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.50)]"></div>

      {/* Modal Content */}
      <div className="relative bg-gray-800 rounded-lg shadow-lg p-6 w-96 z-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Confirm Deletion
        </h2>
        <p className="text-xs sm:text-sm font-normal text-slate-300">
          Are you sure you want to delete your account? This cannot be undone.
        </p>

        <form className="space-y-6" onSubmit={handleDeleteUser}>
          <div className="flex justify-end gap-4 items-center mt-6">
            <button
              type="button"
              onClick={toggleDeleteUserModal}
              className="text-sm sm:text-base bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg shadow text-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm sm:text-base w-fit flex items-center justify-center gap-2 bg-orange-800 hover:bg-orange-700 text-white py-2 px-4 rounded-lg shadow transition cursor-pointer"
            >
              {/* {isLoggingOut ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Logging Out
                </>
              ) : (
                "Logout"
              )} */}
              Delete
            </button>
          </div>
          {/* {isError && (
            <p className="text-red-500">There was a problem logging you out</p>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default DeleteUser;
