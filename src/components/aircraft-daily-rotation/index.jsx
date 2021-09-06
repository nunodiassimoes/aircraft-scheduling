import { useAircraftRotationStore, useFlightsStore } from "store";

import styles from "./styles/aircraftDailyRotation.module.css";

const AircraftDailyRotation = () => {
  const { data: aircraftFlights, removeFlight } = useAircraftRotationStore(
    (state) => state
  );
  const addFlight = useFlightsStore((state) => state.addFlight);

  const removeFlightFromRotation = (id) => {
    const flightToRemove = aircraftFlights.filter((flight) => flight.id === id);

    if (flightToRemove.length > 0) {
      addFlight(flightToRemove[0]);
      removeFlight(id);
    }
  };

  return (
    <>
      <h2>
        This aircraft will do {aircraftFlights.length} flight
        {aircraftFlights.length !== 1 ? "s" : ""}
      </h2>
      <div className={styles.flightsList}>
        {aircraftFlights.map((flight, i) => (
          <div
            key={`flightsListItem_${i.toString()}`}
            className={styles.flightContainer}
          >
            <div className={styles.id}>{flight.id}</div>
            <div className={styles.col1_2}>
              <div>{flight.origin}</div>
              <div>{flight.readable_departure}</div>
            </div>
            <div className={styles.col1_2}>
              <div>{flight.destination}</div>
              <div>{flight.readable_arrival}</div>
            </div>
            <div>
              <button onClick={() => removeFlightFromRotation(flight.id)}>
                Remove flight from rotation
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AircraftDailyRotation;
