import Image from "next/image";

export default function Loading() {
	return (
		<div className="flex items-center justify-center py-10">
			<Image
				src="/loading.svg"
				className="opacity-30"
				alt=""
				width={100}
				height={100}
			/>
		</div>
	);
}
