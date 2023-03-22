import { createReducer } from "@reduxjs/toolkit";
import { fetchUsers, fetchApplications, fetchOfferLists } from "./actions";

interface UsersState {
  user: {};
  applications: [];
  applicationLoading: boolean;
  loading: boolean;
  offerListLoading: boolean;
  offerLists: [];
}

const initialState = {
  user: {},
  applications: [],
  applicationLoading: false,
  offerListLoading: false,
  loading: false,
  offerLists: []
} as UsersState;

const usersSlice = createReducer(initialState, {
  // Add reducers for additional action types here, and handle loading state as needed
  [fetchUsers.pending]: (state: UsersState) => {
    state.loading = true;
  },
  [fetchUsers.fulfilled]: (state: UsersState, { payload }: any) => {
    state.loading = false;
    state.user = payload;
  },
  [fetchUsers.rejected]: (state: UsersState) => {
    state.loading = false;
  },
  [fetchApplications.pending]: (state: UsersState) => {
    state.applicationLoading = true;
  },
  [fetchApplications.fulfilled]: (state: UsersState, { payload }: any) => {
    state.applicationLoading = false;
    state.applications = payload.data;
  },
  [fetchApplications.rejected]: (state: UsersState) => {
    state.applicationLoading = false;
  },
  [fetchOfferLists.pending]: (state: UsersState) => {
    state.offerListLoading = true;
  },
  [fetchOfferLists.fulfilled]: (state: UsersState, { payload }: any) => {
    state.offerListLoading = false;
    state.offerLists = payload.data;
  },
  [fetchOfferLists.rejected]: (state: UsersState) => {
    state.offerListLoading = false;
  }
});

export default usersSlice;
