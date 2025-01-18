const ONE_RADIANS_IN_DEGREE = 180 / Math.PI;

export function degToRad(deg:number):number {
	return deg / ONE_RADIANS_IN_DEGREE;
}

export function radToDeg(rad:number):number {
	return rad * ONE_RADIANS_IN_DEGREE;
}