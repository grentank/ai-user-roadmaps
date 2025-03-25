import type { z } from 'zod';
import type placeSchema from './schema';
import type { addPlaceSchema, userWithPlacesSchema } from './schema';

export type PlaceT = z.infer<typeof placeSchema>;

export type UserWithPlacesT = z.infer<typeof userWithPlacesSchema>;

export type PlaceAddFormT = z.infer<typeof addPlaceSchema>;
