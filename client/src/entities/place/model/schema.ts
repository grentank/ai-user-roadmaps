import { z } from 'zod';
import { userSchema } from '../../user/model/schema';

const placeSchema = z.object({
  id: z.number(),
  name: z.string(),
  order: z.number(),
  image: z.string(),
  geo: z.string(),
  userId: z.number(),
  user: userSchema.optional(),
});

export const userWithPlacesSchema = userSchema.extend({
  places: z.array(placeSchema),
});

export const addPlaceSchema = placeSchema
  .omit({
    id: true,
    order: true,
    // userId: true,
    user: true,
  })
  .extend({
    userId: z.string(),
  });

export default placeSchema;
