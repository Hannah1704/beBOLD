import React from "react";
import {GeneralData} from "../components/GeneralData"
import { UserActivity } from "../components/UserActivity";
import {Friends} from "../components/Friends"
function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>

      <h2>My Profile Data</h2>
      <GeneralData userId={1} />

      <h2>My Activity</h2>
      <UserActivity userId={1}/>

      <h2>My Friends</h2>
      <Friends userId={1}/>
      
    </div>
  );
}

export default Profile;
