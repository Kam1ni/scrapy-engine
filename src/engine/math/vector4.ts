import { Matrix4x4 } from "./matrix4x4";

export class Vector4{
	public x:number;
	public y:number;
	public z:number;
	public w:number;

	public constructor(x:number = 0, y:number = 0, z:number = 0, w:number = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	public toArray():number[] {
		return [this.x, this.y, this.z, this.w];
	}

	public toFlaot32Array():Float32Array {
		return new Float32Array(this.toArray());
	}

	public copyFrom(vector:Vector4):void {
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
		this.w = vector.w;
	}

	public add(v:Vector4):Vector4 {
		return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, v.w);
	}

	public sub(v:Vector4):Vector4 {
		return new Vector4(this.x - v.y, this.y - v.y, this.z - v.z, this.w - v.w);
	}

	public static one():Vector4 {
		return new Vector4(1,1,1, 1);
	}

	public static zero():Vector4 {
		return new Vector4(0,0,0, 0);
	}

	public getLength():number {
		let num = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
		return Math.sqrt(num);
	}

	public getUniform():Vector4 {
		if (this.x == 0 && this.y == 0 && this.z == 0, this.w == 0){
			return new Vector4(1,0,0, 0);
		}
		let length = this.getLength();
		let result = new Vector4(this.x / length, this.y / length, this.z / length, this.w / length);
		return result;
	}


	public multiplyAndAddToOneValue(b:Vector4):number {
		return Vector4.multiplyAndAddToOneValue(this, b);
	}

	public transformMatrix(mat:Matrix4x4):Vector4 {
		let a = new Vector4(0,0,0,0);
		let m = mat.getData();
		a.x = m[0] * this.x + m[4] * this.y + m[8] * this.z + m[12] * this.w;
		a.y = m[1] * this.x + m[5] * this.y + m[9] * this.z + m[13] * this.w;
		a.z = m[2] * this.x + m[6] * this.y + m[10] * this.z + m[14] * this.w;
		a.w = m[3] * this.x + m[7] * this.y + m[11] * this.z + m[15] * this.w;
		return a;
	}

	public static multiplyAndAddToOneValue(a:Vector4, b:Vector4):number {
		let x = a.x * b.x;
		let y = a.y * b.y;
		let z = a.z * b.z;
		let w = a.w * b.w;
		return x+y+z+w;
	}


	public toString():string{
		let n = this.toArray().map(i=>i.toFixed(2));
		return `x: ${n[0]}; y: ${n[1]}; z: ${n[2]}; w: ${n[3]}`;
	}

	public toFloat32Array():Float32Array {
		return new Float32Array(this.toArray());
	}
}