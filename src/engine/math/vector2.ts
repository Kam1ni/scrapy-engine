export class Vector2 {
	public x:number;
	public y:number;
	public z:number;

	constructor(x:number = 0, y:number = 0) {
		this.x = x;
		this.y = y;
	}

	public toArray():number[] {
		return [this.x, this.y];
	}

	public toFloat32Array():Float32Array {
		return new Float32Array(this.toArray());
	}

	public copyFrom(vector:Vector2):void {
		this.x = vector.x;
		this.y = vector.y;
	}

	public multiply(vec:Vector2):Vector2 {
		return new Vector2(this.x * vec.x, this.y * vec.y);
	}

	public add(v:Vector2):Vector2 {
		return new Vector2(this.x + v.x, this.y + v.y);
	}

	public static one():Vector2 {
		return new Vector2(1,1);
	}

	public static zero():Vector2 {
		return new Vector2(0,0);
	}
}