<script lang="ts">
	export let size: number = 40;
	export let color: string = "#636363";
	export let speed: number = 1;


	const radius = size * 0.35;
	const strokeWidth = size * 0.1;
	const center = size / 2;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 ${size} ${size}`}
	width={size}
	height={size}
	preserveAspectRatio="xMidYMid"
	style="shape-rendering:auto;display:block;background:transparent;"
>
	<circle
		cx={center}
		cy={center}
		r={radius}
		stroke={color}
		stroke-width={strokeWidth}
		stroke-dasharray={`${radius * 5.15} ${radius * 1.78}`}
		fill="none"
	>
		<animateTransform
			attributeName="transform"
			type="rotate"
			keyTimes="0;1"
			values={`0 ${center} ${center};360 ${center} ${center}`}
			dur={`${speed}s`}
			repeatCount="indefinite"
		/>
	</circle>
</svg>
