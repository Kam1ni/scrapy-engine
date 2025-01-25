import { Matrix4x4 } from "./matrix4x4";
import { Vector4 } from "./vector4";

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

	public sub(v:Vector3):Vector3 {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	}

	public getLength():number {
		let num = this.x * this.x + this.y * this.y + this.z * this.z;
		return Math.sqrt(num);
	}

	public getUniform():Vector3 {
		if (this.x == 0 && this.y == 0 && this.z == 0){
			return new Vector3(1,0,0);
		}
		let length = this.getLength();
		let result = new Vector3(this.x / length, this.y / length, this.z / length);
		return result;
	}


	public rotateX(angle:number):Vector3 {
		let m = Matrix4x4.rotationX(angle);
		let v4 = new Vector4(this.x, this.y, this.z, 0);
		v4 = m.vectorMultiply(v4);
		return new Vector3(v4.x,v4.y,v4.z);
	}

	public rotateY(angle:number):Vector3 {
		angle = -angle;
		let m = Matrix4x4.rotationY(angle);
		let v4 = new Vector4(this.x, this.y, this.z, 0);
		v4 = m.vectorMultiply(v4);
		return new Vector3(v4.x,v4.y,v4.z);
	}

	public rotateZ(angle:number):Vector3 {
		angle = -angle;
		let m = Matrix4x4.rotationZ(angle);
		let v4 = new Vector4(this.x, this.y, this.z, 0);
		v4 = m.vectorMultiply(v4);
		return new Vector3(v4.x,v4.y,v4.z);
	}

	public static one():Vector3 {
		return new Vector3(1,1,1);
	}

	public static zero():Vector3 {
		return new Vector3(0,0,0);
	}

	public toString():string{
		let n = this.toArray().map(i=>i.toFixed(2));
		return `x: ${n[0]}; y: ${n[1]}; z: ${n[2]}`;
	}
}

(window as any).Vector3 = Vector3;