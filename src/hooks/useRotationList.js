import memoize from "lodash.memoize";

const useRotationList = () => {
  const isAfterMidnight = (flight) => {
    const midnight = 60 * 60 * 24;

    return flight.arrivaltime > midnight;
  };

  const hasTurnaroundTime = (previousFlight, flight, nextFlight) => {
    const turnaroundTime = 60 * 20;

    return (
      (!previousFlight ||
        flight.departuretime >= previousFlight.arrivaltime + turnaroundTime) &&
      (!nextFlight ||
        flight.arrivaltime <= nextFlight.departuretime - turnaroundTime)
    );
  };

  const doesTeleport = (previousFlight, flight, nextFlight) => {
    return (
      (previousFlight && previousFlight.destination !== flight.origin) ||
      (nextFlight && flight.destination !== nextFlight.origin)
    );
  };

  const colidesWithOtherFlights = (currentFlights, flightToAdd) => {
    return !currentFlights.every(
      (flight) =>
        flight.arrivaltime < flightToAdd.departuretime ||
        flight.departuretime > flightToAdd.arrivaltime
    );
  };

  const sortList = memoize((list) => {
    if (!list) return [];

    const listCopy = [...list];

    listCopy.sort((a, b) =>
      a.departuretim > b.departuretime
        ? 1
        : b.departuretime > a.departuretime
        ? -1
        : 0
    );

    return listCopy;
  });

  const usagePercentage = (flights) => {
    if (!flights) return 0;

    const dayInSeconds = 60 * 60 * 24;

    const flightsTotalTime = flights.reduce(
      (acc, current) => acc + (current.arrivaltime - current.departuretime),
      0
    );

    return Math.round((flightsTotalTime * 100) / dayInSeconds);
  };

  return {
    usagePercentage,
    sortList,
    validateRotationRules: (currentList, flightToAdd) => {
      const errorBaseString = "This flight cannot be used:";

      if (isAfterMidnight(flightToAdd))
        return `${errorBaseString} It makes the aircraft flight over midnight.`;

      const sortedList = sortList(currentList);

      if (colidesWithOtherFlights(sortedList, flightToAdd))
        return `${errorBaseString} It colides with flights already defined.`;

      const previousFlights = sortedList.filter(
        (flight) => flight.arrivaltime < flightToAdd.departuretime
      );
      const previousFlight =
        previousFlights.length > 0
          ? previousFlights[previousFlights.length - 1]
          : null;

      const nextFlights = sortedList.filter(
        (flight) => flight.departuretime > flightToAdd.arrivaltime
      );
      const nextFlight = nextFlights.length > 0 ? nextFlights[0] : null;

      if (!hasTurnaroundTime(previousFlight, flightToAdd, nextFlight))
        return `${errorBaseString} A 20m of turnaround time between flight is required.`;

      if (doesTeleport(previousFlight, flightToAdd, nextFlight))
        return `${errorBaseString} You are teleporting the aircraft and this is too expensive.`;

      return null;
    },
  };
};

export default useRotationList;
