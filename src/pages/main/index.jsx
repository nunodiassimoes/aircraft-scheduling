import AircraftsList from "components/aircrafts-list";
import AircraftDailyRotation from "components/aircraft-daily-rotation";
import AircraftTimeline from "components/aircraft-timeline";
import FlightsList from "components/flights-list";

import styles from "./styles/main.module.css";

const MainPage = () => {
  return (
    <div>
      <div className={styles.col1_4}>
        <AircraftsList />
      </div>
      <div className={styles.col1_2}>
        <AircraftDailyRotation />
        <AircraftTimeline />
      </div>
      <div className={styles.col1_4}>
        <FlightsList />
      </div>
    </div>
  );
};

export default MainPage;
