import { createAsyncThunk } from '@reduxjs/toolkit';
import placeService from '../../entities/place/api/service';
import { addPlaceSchema } from '../../entities/place/model/schema';
import type { PlaceT } from '../../entities/place/model/types';
import userService from '../../entities/user/api/service';
import type { UserT } from '../../entities/user/model/types';

export const loadAllUsersThunk = createAsyncThunk('roadmaps/loadAllUsersThunk', () =>
  userService.getUsers(),
);

export const loadUserRoadmapThunk = createAsyncThunk(
  'roadmaps/loadUserRoadmapThunk',
  (userId: UserT['id']) => placeService.getPlacesByUserId(userId),
);

export const deletePlaceThunk = createAsyncThunk(
  'roadmaps/deletePlaceThunk',
  async (placeId: PlaceT['id']) => {
    await placeService.deletePlaceById(placeId);
    return placeId;
  },
);

export const addPlaceThunk = createAsyncThunk(
  'roadmaps/addPlaceThunk',
  async (formData: FormData) => {
    const data = addPlaceSchema.parse(Object.fromEntries(formData));
    return placeService.createPlace(data, Number(data.userId));
  },
);
