import React from "react";
import Profile from "./Profile";

const ProfileAside = async () => {
  return (
    <aside>
      <div className="bg-gray-100 p-4 mb-3 mt-12 sm:mx-6 md:mr-10 rounded-lg">
        <h3 className="text-gray-800 mb-2 border-b-4">Profile</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          <Profile nameCenter={false} />
        </div>
      </div>
    </aside>
  );
};

export default ProfileAside;
