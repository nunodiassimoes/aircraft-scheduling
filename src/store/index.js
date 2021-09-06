import create from "zustand";

export const useFlightsStore = create((set) => ({
  data: [],
  hasMoreData: true,
  pagination: null,
  loading: false,
  error: null,
  setData: (apiResponse) =>
    set(() => ({
      ...apiResponse,
      hasMoreData: apiResponse.data.length === 25,
      loading: false,
    })),
  setDataIncremental: (apiResponse) => {
    set((state) => ({
      data: [...state.data, ...apiResponse.data],
      pagination: { ...apiResponse.pagination },
      hasMoreData: apiResponse.data.length === 25,
      loading: false,
    }));
  },
  setLoading: (status) => set(() => ({ loading: status })),
  setError: (error) => set(() => ({ error, loading: false })),
  addFlight: (flight) => set((state) => ({ data: [...state.data, flight] })),
  removeFlight: (id) =>
    set((state) => ({
      data: [...state.data.filter((entry) => entry.id !== id)],
    })),
}));

export const useAircraftsStore = create((set) => ({
  data: [],
  pagination: null,
  loading: false,
  error: null,
  setData: (apiResponse) => set(() => ({ ...apiResponse, loading: false })),
  setLoading: (status) => set(() => ({ loading: status })),
  setError: (error) => set(() => ({ error, loading: false })),
}));

export const useAircraftRotationStore = create((set) => ({
  data: [],
  updateRotation: (flights) => set(() => ({ data: flights })),
  removeFlight: (id) =>
    set((state) => ({
      data: [...state.data.filter((entry) => entry.id !== id)],
    })),
}));
