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

	public toFlaot32Array():Float32Array {
		return new Float32Array(this.toArray());
	}

	public copyFrom(vector:Vector3):void {
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
	}

	public static one():Vector3 {
		return new Vector3(1,1,1);
	}

	public static zero():Vector3 {
		return new Vector3(0,0,0);
	}
}