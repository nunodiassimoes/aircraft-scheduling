const useHandleRequestForStore = (storeInstance, apiSdkFunction) => {
  const { setData, setDataIncremental, setError, setLoading } = storeInstance(
    (state) => state
  );

  return {
    fetchRequest: async (params = {}, isIncremental = false) => {
      setLoading(true);
      setError(null);

      try {
        const {
          data: { data, pagination },
        } = await apiSdkFunction(params);

        isIncremental
          ? setDataIncremental({ data: data, pagination })
          : setData({ data: data, pagination });

        setError(null);
      } catch (e) {
        console.error(e);
        setError(e);
      }
    },
  };
};

export default useHandleRequestForStore;
