import type { z } from 'zod';
import type { userSchema } from './schema';

export type UserT = z.infer<typeof userSchema>;
// type UserT = {
//     name: string;
//     id: number;
//     email: string;
// }
