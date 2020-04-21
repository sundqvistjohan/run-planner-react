import React from "react";
import { useAuth0 } from "../modules/react-auth0-spa";

function Profile() {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.given_name} {user.family_name}</h2>
      <span>Athlete ID: {user.sub.split("|")[2]}</span>
    </div>
  );
}

export default Profile;
