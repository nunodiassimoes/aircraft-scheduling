import { useAircraftRotationStore } from "store";

import styles from "./styles/aircraftTimeline.module.css";

const AircraftTimeline = () => {
  const aircraftFlights = useAircraftRotationStore((state) => state.data);
  const dayInSeconds = 60 * 60 * 24;
  let lastPosition = 0;

  const calculatePosition = (time) => {
    const position = (time * 100) / dayInSeconds;

    return time >= dayInSeconds ? 100 : position;
  };

  return (
    <div className={styles.aircraftTimelineContainer}>
      {aircraftFlights.map((flight, i) => {
        const departurePosition = calculatePosition(flight.departuretime);
        const arrivalPosition = calculatePosition(flight.arrivaltime);
        const turnaroundPosition = calculatePosition(
          flight.arrivaltime + 20 * 60
        );
        const tempLastPosition = lastPosition;
        lastPosition = turnaroundPosition;

        return (
          <>
            {departurePosition > tempLastPosition && (
              <div
                key={`aircraftTimelineIdle_${i.toString()}`}
                className={`${styles.flightEntry} ${styles.idleType}`}
                style={{
                  left: `${tempLastPosition}%`,
                  width: `${departurePosition - tempLastPosition}%`,
                }}
              />
            )}
            <div
              key={`aircraftTimelineFlight_${i.toString()}`}
              className={`${styles.flightEntry} ${styles.flightType}`}
              style={{
                left: `${departurePosition}%`,
                width: `${arrivalPosition - departurePosition}%`,
              }}
            />
            <div
              key={`aircraftTimelineTurnaround_${i.toString()}`}
              className={`${styles.flightEntry} ${styles.turnaroundType}`}
              style={{
                left: `${arrivalPosition}%`,
                width: `${turnaroundPosition - arrivalPosition}%`,
              }}
            />
          </>
        );
      })}
      {lastPosition < dayInSeconds && (
        <div
          key={`aircraftTimelineIdle_last`}
          className={`${styles.flightEntry} ${styles.idleType}`}
          style={{
            left: `${lastPosition}%`,
            width: `${100 - lastPosition}%`,
          }}
        />
      )}
    </div>
  );
};

export default AircraftTimeline;
