"use client";

import type { ComponentType, PropsWithChildren } from "react";
import { api } from "~/trpc/client";

export const TrpcProvider = api.withTRPC(
	({ children }: PropsWithChildren) => children,
) as ComponentType<PropsWithChildren>;
