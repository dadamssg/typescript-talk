import React from "react";
import UserProfile, { UserProfile as Profile } from "./UserProfile";

const profile = {
  firstName: "David",
  lastName: "Adams",
  email: "dadams@clearc2.com",
};

export default function App() {
  return (
    <div>
      <Profile profile={profile} color="blue" foobar={7} />
      <UserProfile id="123" />
    </div>
  );
}
