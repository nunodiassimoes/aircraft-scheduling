import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";

import { aircraftsFixture } from "utils/tests/fixtures";
import mockedAxios from "utils/tests/mockedAxios";

import AircraftsList from "..";

const { mockAxios } = mockedAxios;

const renderAircraftsList = () => {
  return render(<AircraftsList />);
};

describe("AircraftsList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.resetAllMocks();
    mockedAxios.get.success(aircraftsFixture);
  });

  test("should display correctly the list of aircrafts", async () => {
    const { container } = renderAircraftsList();

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    expect(container).toMatchSnapshot();
  });
});
