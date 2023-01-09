import { Vector3 } from "../math";

export class Ray {
	public position:Vector3;
	public direction:Vector3;

	public constructor(position:Vector3, direction:Vector3) {
		this.position = position;
		this.direction = direction;
	}

	// Checks if ray intersects with line.
	// * linePoint1: First point of the line
	// * linePoint2: Second point of the line
	// Code source: https://www.youtube.com/watch?v=TOEi6T2mtHo&list=WL&index=5
	public intersectsWithLine(linePoint1:Vector3, linePoint2:Vector3):Vector3 | null{
		let x1 = linePoint1.x;
		let y1 = linePoint1.y;
		let x2 = linePoint2.x;
		let y2 = linePoint2.y;
		let x3 = this.position.x;
		let y3 = this.position.y;
		let x4 = this.position.x + this.direction.x;
		let y4 = this.position.y + this.direction.y;


		let den = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4);
		if (den == 0){
			return null;
		}

		let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
		let u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den;

		if (t > 0 && t < 1 && u > 0) {
			let pt = new Vector3();
			pt.x = x1 + t * (x2 - x1);
			pt.y = y1 + t * (y2 - y1);
			return pt;
		}

		return null;
	}
}