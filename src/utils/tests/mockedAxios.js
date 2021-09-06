import mockAxios from "axios";

const printSuccessMessage = false;

const mockAxiosMethod = (method) => {
  const result = {
    success: (mockData) => {
      mockAxios[method].mockImplementationOnce((request, data) => {
        if (printSuccessMessage) {
          console.log(`received request ${request} with data`, data);
          console.log("returning success with ", { data: mockData });
        }

        return Promise.resolve({ data: mockData });
      });

      return result;
    },
    error: (mockError) => {
      mockAxios[method].mockRejectedValueOnce(mockError);

      return result;
    },
    mockClear: () => {
      mockAxios[method].mockClear();

      return result;
    },
  };

  return result;
};

const methods = ["get", "post", "put", "delete"];

const mockedAxios = {
  get: mockAxiosMethod("get"),
  post: mockAxiosMethod("post"),
  put: mockAxiosMethod("put"),
  delete: mockAxiosMethod("delete"),
  resetAllMocks: () =>
    methods.forEach((method) => mockAxios[method].mockReset()),
  mockAxios,
};

export default mockedAxios;
