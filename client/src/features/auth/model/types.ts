import type { z } from 'zod';
import type { UserT } from '../../../entities/user/model/types';
import type { authResponseSchema, loginFormSchema, signupFormSchema } from './schemas';

export type AuthResponseT = z.infer<typeof authResponseSchema>;
export type LoginFormT = z.infer<typeof loginFormSchema>;
export type SignupFormT = z.infer<typeof signupFormSchema>;

export enum AuthStatus {
  PENDING = 'pending',
  GUEST = 'guest',
  AUTHORIZED = 'authorized',
}

export type AuthSliceT =
  | {
      status: AuthStatus.PENDING;
      buttonLoading: boolean;
    }
  | {
      status: AuthStatus.GUEST;
      buttonLoading: boolean;
    }
  | {
      status: AuthStatus.AUTHORIZED;
      user: UserT;
      buttonLoading: boolean;
    };

