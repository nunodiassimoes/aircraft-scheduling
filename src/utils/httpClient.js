export default class HttpClient {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  get(url, data, options = {}) {
    return this.axiosInstance
      .get(url, {
        params: data,
        ...options,
      })
      .catch((error) => {
        throw error;
      });
  }

  post(url, data) {
    return this.axiosInstance.post(url, data).catch((error) => {
      throw error;
    });
  }

  put(url, data) {
    return this.axiosInstance.put(url, data).catch((error) => {
      throw error;
    });
  }

  delete(url, data) {
    return this.axiosInstance
      .delete(url, {
        params: data,
      })
      .catch((error) => {
        throw error;
      });
  }
}

// We can access error.response.status to get error status code
export const processRequest = (request, setFunc, setLoading, setError) => {
  return (
    request()
      .then((response) => {
        setFunc(response.data);
        if (setLoading) setLoading(false);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        setError(true);
        if (setLoading) setLoading(false);
      })
  );
};
