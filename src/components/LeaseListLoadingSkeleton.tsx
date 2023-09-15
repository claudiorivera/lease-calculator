import { Skeleton } from "~/components/ui/skeleton";

export function LeaseListLoadingSkeleton() {
	return (
		<ul className="flex flex-col items-center gap-4">
			{Array.from({ length: 3 }).map((_, index) => (
				<li key={index}>
					<Skeleton className="h-4 w-96" />
				</li>
			))}
		</ul>
	);
}
