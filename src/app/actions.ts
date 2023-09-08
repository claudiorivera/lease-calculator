"use server";

import { leaseRouter } from "~/server/api/routers/lease";
import { createAction } from "~/server/api/trpc";

/** You can import procedures from your api router. */
export const getAllLeases = createAction(leaseRouter.all);
