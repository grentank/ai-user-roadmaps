import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { PlaceT, UserWithPlacesT } from '../../entities/place/model/types';
import { addPlaceThunk, deletePlaceThunk, loadAllUsersThunk, loadUserRoadmapThunk } from './thunks';

export type RoadmapState = {
  users: UserWithPlacesT[];
  oneUserPlaces: PlaceT[];
  sort: {
    key: 'order' | 'name';
    order: 'asc' | 'desc';
  };
  orderedPlaces: PlaceT[];
  isLoadingUsers: boolean;
};

const initialState: RoadmapState = {
  users: [],
  oneUserPlaces: [],
  sort: {
    key: 'order',
    order: 'asc',
  },
  orderedPlaces: [],
  isLoadingUsers: false,
};

function applySort(state: RoadmapState): void {
  state.orderedPlaces = state.oneUserPlaces.toSorted((a, b) => {
    if (state.sort.key === 'order') {
      return state.sort.order === 'asc' ? a.order - b.order : b.order - a.order;
    }
    return state.sort.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });
}

export const roadmapSlice = createSlice({
  name: 'roadmaps',
  initialState,
  reducers: {
    changeSort: (state, action: PayloadAction<'order' | 'name'>) => {
      if (state.sort.key === action.payload) {
        state.sort.order = state.sort.order === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort.key = action.payload;
        state.sort.order = 'asc';
      }
      applySort(state);
      //   state.orderedPlaces = state.oneUserPlaces.toSorted((a, b) => {
      //     if (state.sort.key === 'order') {
      //       return state.sort.order === 'asc' ? a.order - b.order : b.order - a.order;
      //     }
      //     return state.sort.order === 'asc'
      //       ? a.name.localeCompare(b.name)
      //       : b.name.localeCompare(a.name);
      //   });
    },
    clearUserPlaces: (state) => {
      state.oneUserPlaces = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoadingUsers = false;
      })
      .addCase(loadAllUsersThunk.pending, (state) => {
        state.isLoadingUsers = true;
      })
      .addCase(loadAllUsersThunk.rejected, (state) => {
        state.isLoadingUsers = false;
      })
      .addCase(loadUserRoadmapThunk.fulfilled, (state, action) => {
        state.oneUserPlaces = action.payload;
        applySort(state);
      })
      .addCase(deletePlaceThunk.fulfilled, (state, action) => {
        const targetPlace = state.oneUserPlaces.find((place) => place.id === action.payload);
        if (!targetPlace) return;
        state.oneUserPlaces = state.oneUserPlaces
          .filter((place) => place.id !== action.payload)
          .toSorted((a, b) => a.order - b.order)
          .map((place, index) => ({ ...place, order: index + 1 }));
        applySort(state);
      })
      .addCase(addPlaceThunk.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

// Action creators are generated for each case reducer function
export const { changeSort, clearUserPlaces } = roadmapSlice.actions;

export default roadmapSlice.reducer;
