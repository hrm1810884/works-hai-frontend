/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { ResultError, ResultOk, Result as UsecaseResult } from ".";

export const usecaseResultOk = ResultOk;
export const usecaseResultError = ResultError;

export type UsecaseMethod = (
    ...args: any[]
) => UsecaseResult<unknown, Error | null> | Promise<UsecaseResult<unknown, Error | null>>;
