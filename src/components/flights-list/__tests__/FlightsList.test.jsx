import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { flightsFixture } from "utils/tests/fixtures";
import mockedAxios from "utils/tests/mockedAxios";

import FlightsList from "..";

const { mockAxios } = mockedAxios;

const renderFlightsList = () => {
  return render(<FlightsList />);
};

describe("FlightsList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.resetAllMocks();
    mockedAxios.get.success(flightsFixture);
  });

  test("should display correctly the list of flights", async () => {
    const { container } = renderFlightsList();

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    expect(container).toMatchSnapshot();
  });

  test("should remove flight when adding it to the rotation list", async () => {
    const { getByTestId, queryByTestId } = renderFlightsList();

    userEvent.click(getByTestId("addFlightToRotationAS1001"));

    await waitFor(() =>
      expect(queryByTestId("flightsListItemAS1001")).toBeNull()
    );
  });
});
