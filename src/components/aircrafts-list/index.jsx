import { useEffect } from "react";

import { useAircraftRotationStore, useAircraftsStore } from "store";
import { useHandleRequestForStore, useRotationList } from "hooks";
import { getAircrafts } from "apiSdk";

import styles from "./styles/aircraftsList.module.css";

const AircraftsList = () => {
  const { fetchRequest: fetchAircraftsRequest } = useHandleRequestForStore(
    useAircraftsStore,
    getAircrafts
  );
  const { data: aircrafts } = useAircraftsStore((state) => state);
  const { data: aircraftFlights } = useAircraftRotationStore((state) => state);
  const { usagePercentage } = useRotationList();

  useEffect(() => {
    fetchAircraftsRequest();
  }, []);

  return (
    <>
      <h2>We have {aircrafts.length} aircrafts</h2>
      <div className={styles.aircraftsList}>
        {aircrafts.map((aircraft, i) => (
          <div
            className={styles.aircraftContainer}
            key={`aircraftsListItem_${i.toString()}`}
          >
            <div>
              {aircraft.ident} {aircraft.type}
            </div>
            <div>{usagePercentage(aircraftFlights)}%</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AircraftsList;
