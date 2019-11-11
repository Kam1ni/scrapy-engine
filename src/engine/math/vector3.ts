export class Vector3 {
	public x:number;
	public y:number;
	public z:number;

	constructor(x:number = 0, y:number = 0, z:number = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public toArray():number[] {
		return [this.x, this.y, this.z];
	}

	public toFloat32Array():Float32Array {
		return new Float32Array(this.toArray());
	}

	public copyFrom(vector:Vector3):void {
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
	}

	public multiply(vec:Vector3):Vector3 {
		return new Vector3(this.x * vec.x, this.y * vec.y, this.z * vec.z);
	}

	public add(v:Vector3):Vector3 {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	}

	public static one():Vector3 {
		return new Vector3(1,1,1);
	}

	public static zero():Vector3 {
		return new Vector3(0,0,0);
	}
}