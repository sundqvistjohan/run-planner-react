import React, { useEffect, useState } from "react";
import { getActivities } from "../modules/activities";

function Planner() {
  let activitiesList;

  const [activities, setActivities] = useState([]);

  const allActivities = async () => {
    const activitiesRequest = await getActivities();
    setActivities(activitiesRequest);
  };

  useEffect(() => {
    allActivities();
  }, []);

  if (activities && activities.length > 0) {
    activitiesList = activities.map((activity) => {
      return (
        <ul>
          <li>Type: {activity.type}</li>
          <li>Intervals: {activity.intervals}</li>
          <li>Length: {activity.length} km</li>
        </ul>
      );
    });
  }

  return (
    <>
      <h1>RUN PLANNER</h1>
      {activitiesList}
    </>
  );
}

export default Planner;
