import { UseMutateFunction } from "@tanstack/react-query";

export type User = {
    user_id: string;
    email: string;
    password: string;
}

export type IUseSignUp = UseMutateFunction<User, unknown, {
    email: string;
    password: string;
  }, unknown>