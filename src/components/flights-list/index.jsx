import { useEffect } from "react";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAircraftRotationStore, useFlightsStore } from "store";
import { useHandleRequestForStore, useRotationList } from "hooks";

import { getFlights } from "apiSdk";

import styles from "./styles/flightsList.module.css";

const FlightsList = () => {
  const {
    data: flights,
    hasMoreData,
    pagination,
    removeFlight,
  } = useFlightsStore((state) => state);
  const { data: aircraftFlights, updateRotation } = useAircraftRotationStore(
    (state) => state
  );
  const { fetchRequest: fetchFlightsRequest } = useHandleRequestForStore(
    useFlightsStore,
    getFlights
  );
  const { sortList, validateRotationRules } = useRotationList();

  toast.configure();

  const addFlightToRotation = (id) => {
    const flightToAdd = flights.filter((flight) => flight.id === id);

    if (flightToAdd.length === 0) return;

    const errorString = validateRotationRules(aircraftFlights, flightToAdd[0]);

    if (!errorString) {
      updateRotation(sortList([...aircraftFlights, flightToAdd[0]]));
      removeFlight(id);
    } else {
      toast.error(errorString, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        theme: "colored",
      });
    }
  };

  const fetchMoreData = () => {
    fetchFlightsRequest({ offset: pagination.offset + 25, limit: 25 }, true);
  };

  useEffect(() => {
    fetchFlightsRequest({ offset: 0, limit: 25 }, false);
  }, []);

  return (
    <>
      <h2>Available flights</h2>
      <InfiniteScroll
        dataLength={flights.length}
        next={fetchMoreData}
        hasMore={hasMoreData}
        loader={<div>Loading...</div>}
      >
        {flights.map((flight, i) => (
          <div
            data-testid={`flightsListItem${flight.id}`}
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
              <button
                data-testid={`addFlightToRotation${flight.id}`}
                onClick={() => addFlightToRotation(flight.id)}
              >
                Add flight to rotation
              </button>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default FlightsList;
