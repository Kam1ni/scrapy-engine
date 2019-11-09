export function approach(current:number, target:number, dt:number):number {
	if (target > current) {
		current += dt;
		if (current > target) {
			return target;
		}
		return current;
	}
	if (target < current) {
		current -= dt;
		if (current < target) {
			return target;
		}
		return current;
	}
	return target;

}