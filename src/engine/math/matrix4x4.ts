import { Vector3 } from "./vector3";
import { Vector4 } from "./vector4";

export class Matrix4x4 {
	private data:number[] = [];

	private constructor() {
		this.data = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		];
	}

	public copyFrom(m:Matrix4x4):void {
		this.data = [...m.data];
	}

	public getData():number[] {
		return [...this.data];
	}

	public getRow(row:number):Vector4 {
		let offset = row * 4;
		let result = new Vector4(0,0,0,0);
		result.x = this.data[offset];
		result.y = this.data[offset + 1];
		result.z = this.data[offset + 2];
		result.w = this.data[offset + 3];
		return result;
	}

	public getCol(col:number):Vector4 {
		let result = new Vector4(0,0,0,0);
		result.x = this.data[col];
		result.y = this.data[col+4];
		result.z = this.data[col+8];
		result.w = this.data[col+12];
		return result;
	}

	public static identity():Matrix4x4 {
		return new Matrix4x4();
	}

	public static orthographic(left:number, right:number, bottom:number, top:number, nearClip:number, farClip:number):Matrix4x4 {
		let m = Matrix4x4.identity();

		m.data[0] = 2 / (right - left);
		m.data[5] = 2 / (top - bottom);
		m.data[10] = -2 / (farClip - nearClip);

		m.data[12] = -((right + left) / (right -left));
		m.data[13] = -((top + bottom) / (top - bottom));
		m.data[14] = -((farClip + nearClip) / (farClip - nearClip));
		m.data[15] = 1;

		return m;
	}

	public static perspective(left:number, right:number, bottom:number, top:number, nearClip:number, farClip:number, fov:number):Matrix4x4 {
		let width = right - left;
		let height = top - bottom;

		let aspect = width / height;
		let f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
		let rangeInv = 1.0 / (nearClip - farClip);


		let m = Matrix4x4.identity();
		m.data[0] = f / aspect;
		m.data[5] = f;
		m.data[10] = (nearClip + farClip) * rangeInv;
		m.data[14] = -1;

		m.data[11] = nearClip * farClip * rangeInv * 2;
		m.data[15] = 0;
	
		return m;
	}

	public static translation(position:Vector3):Matrix4x4 {
		let m = new Matrix4x4();
		
		m.data[12] = position.x;
		m.data[13] = position.y;
		m.data[14] = position.z;

		return m;
	}

	
	public static rotationX(angleInRadians:number):Matrix4x4 {
		let m = new Matrix4x4();

		let c = Math.cos(angleInRadians);
		let s = Math.sin(angleInRadians);

		m.data[5] = c;
		m.data[6] = -s;
		m.data[9] = s;
		m.data[10] = c;

		return m;
	}

	
	public static rotationY(angleInRadians:number):Matrix4x4 {
		let m = new Matrix4x4();

		let c = Math.cos(angleInRadians);
		let s = Math.sin(angleInRadians);

		m.data[0] = c;
		m.data[2] = s;
		m.data[8] = -s;
		m.data[10] = c;

		return m;
	}

	public static rotationZ(angleInRadians:number):Matrix4x4 {
		let m = new Matrix4x4();

		let c = Math.cos(angleInRadians);
		let s = Math.sin(angleInRadians);

		m.data[0] = c;
		m.data[1] = -s;
		m.data[4] = s;
		m.data[5] = c;

		return m;
	}

	public static rotationXYZ(xRadians:number, yRadians:number, zRadians:number):Matrix4x4 {
		let rx = Matrix4x4.rotationX(xRadians);
		let ry = Matrix4x4.rotationY(yRadians);
		let rz = Matrix4x4.rotationZ(zRadians);

		return Matrix4x4.multiply(Matrix4x4.multiply(rz, ry), rx);
	}


	public static scale(scale:Vector3):Matrix4x4 {
		let m = new Matrix4x4();
		
		m.data[0] = scale.x;
		m.data[5] = scale.y;
		m.data[10] = scale.z;

		return m;
	}

	public getTranslation():Vector3 {
		let scale = this.getScaling();
		return new Vector3(this.data[12], this.data[13], this.data[14]);
	}

	public getScaling():Vector3 {
		let m11 = this.data[0];
		let m12 = this.data[1];
		let m13 = this.data[2];
		let m21 = this.data[4];
		let m22 = this.data[5];
		let m23 = this.data[6];
		let m31 = this.data[8];
		let m32 = this.data[9];
		let m33 = this.data[10];

		return new Vector3(Math.hypot(m11,m12,m13), Math.hypot(m21,m22,m23), Math.hypot(m31,m32,m33));
	}

	public getRotation():Vector3 {		
		let scaling = this.getScaling();

		let is1 = 1 / scaling.x;
		let is2 = 1 / scaling.y;
		let is3 = 1 / scaling.z;

		let sm11 = this.data[0] * is1;
		let sm12 = this.data[1] * is2;
		let sm13 = this.data[2] * is3;
		let sm21 = this.data[4] * is1;
		let sm22 = this.data[5] * is2;
		let sm23 = this.data[6] * is3;
		let sm31 = this.data[8] * is1;
		let sm32 = this.data[9] * is2;
		let sm33 = this.data[10] * is3;

		let trace = sm11 + sm22 + sm33;

		let quat = [];
		if (trace > 0) {
			let S = Math.sqrt(trace + 1.0) * 2;
			quat[3] = 0.25 * S;
			quat[0] = (sm23 - sm32) / S;
			quat[1] = (sm31 - sm13) / S;
			quat[2] = (sm12 - sm21) / S;
		} else if ((sm11 > sm22) && (sm11 > sm33)) {
			let S = Math.sqrt(1.0 + sm11 - sm22- sm33) * 2;
			quat[3] = (sm23 - sm32) / S;
			quat[0] = 0.25 * S;
			quat[1] = (sm12 + sm21) / S;
			quat[2] = (sm31 + sm13) / S;
		} else if (sm22 > sm33) {
			let S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
			quat[3] = (sm31 - sm13) / S;
			quat[0] = (sm12 + sm21) / S;
			quat[1] = 0.25 * S;
			quat[2] = (sm23 + sm32) / S;
		} else {
			let S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
			quat[3] = (sm12 - sm21) / S;
			quat[0] = (sm31 + sm13) / S;
			quat[1] = (sm23 + sm32) / S;
			quat[2] = 0.25 * S;
		}

		let rad = Math.acos(quat[3]) * 2;
		let s = Math.sin(rad / 2);
		if (s > 0) {
			return new Vector3(quat[0] / s, quat[1] / s, quat[2] / s);
		}
		return new Vector3(0,0,0);
	}

	public static multiply(a:Matrix4x4, b:Matrix4x4):Matrix4x4 {
		let m = new Matrix4x4();
		let b00 = b.data[0 * 4 + 0];
		let b01 = b.data[0 * 4 + 1];
		let b02 = b.data[0 * 4 + 2];
		let b03 = b.data[0 * 4 + 3];
		let b10 = b.data[1 * 4 + 0];
		let b11 = b.data[1 * 4 + 1];
		let b12 = b.data[1 * 4 + 2];
		let b13 = b.data[1 * 4 + 3];
		let b20 = b.data[2 * 4 + 0];
		let b21 = b.data[2 * 4 + 1];
		let b22 = b.data[2 * 4 + 2];
		let b23 = b.data[2 * 4 + 3];
		let b30 = b.data[3 * 4 + 0];
		let b31 = b.data[3 * 4 + 1];
		let b32 = b.data[3 * 4 + 2];
		let b33 = b.data[3 * 4 + 3];
		let a00 = a.data[0 * 4 + 0];
		let a01 = a.data[0 * 4 + 1];
		let a02 = a.data[0 * 4 + 2];
		let a03 = a.data[0 * 4 + 3];
		let a10 = a.data[1 * 4 + 0];
		let a11 = a.data[1 * 4 + 1];
		let a12 = a.data[1 * 4 + 2];
		let a13 = a.data[1 * 4 + 3];
		let a20 = a.data[2 * 4 + 0];
		let a21 = a.data[2 * 4 + 1];
		let a22 = a.data[2 * 4 + 2];
		let a23 = a.data[2 * 4 + 3];
		let a30 = a.data[3 * 4 + 0];
		let a31 = a.data[3 * 4 + 1];
		let a32 = a.data[3 * 4 + 2];
		let a33 = a.data[3 * 4 + 3];

		m.data[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
		m.data[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
		m.data[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
		m.data[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
		m.data[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
		m.data[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
		m.data[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
		m.data[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
		m.data[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
		m.data[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
		m.data[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
		m.data[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
		m.data[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
		m.data[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
		m.data[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
		m.data[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
		return m;
	}

	public vectorMultiply(vec:Vector4):Vector4 {
		let x0 = this.data[0] * vec.x;
		let x1 = this.data[4] * vec.y;
		let x2 = this.data[8] * vec.z;
		let x3 = this.data[12] * vec.w;
		let x = x0+x1+x2+x3;
		
		let y0 = this.data[1] * vec.x;
		let y1 = this.data[5] * vec.y;
		let y2 = this.data[9] * vec.z;
		let y3 = this.data[13] * vec.w;
		let y = y0 + y1 + y2 + y3;

		let z0 = this.data[2] * vec.x;
		let z1 = this.data[6] * vec.y;
		let z2 = this.data[10] * vec.z;
		let z3 = this.data[14] * vec.w;
		let z = z0 + z1 + z2 + z3;

		let w0 = this.data[3] * vec.x;
		let w1 = this.data[7] * vec.y;
		let w2 = this.data[11] * vec.z;
		let w3 = this.data[15] * vec.w;
		let w = w0 + w1 + w2 + w3;

		return new Vector4(x,y,z,w);
	}

	public static test():void {
		let mat1 = Matrix4x4.identity();
		mat1.data[0] = 1;
		mat1.data[1] = -2;
		mat1.data[2] = 1;
		mat1.data[3] = 4;
		mat1.data[4] = 0;
		mat1.data[5] = 1;
		mat1.data[6] = 0;
		mat1.data[7] = 1;
		mat1.data[8] = 2;
		mat1.data[9] = 3;
		mat1.data[10] = 4;
		mat1.data[11] = 1;
		mat1.data[12] = 1;
		mat1.data[13] = 5;
		mat1.data[14] = 1;
		mat1.data[15] = 1;

		let mat2 = Matrix4x4.identity();
		mat2.data[0] = 2;
		mat2.data[1] = 5;
		mat2.data[2] = 1;
		mat2.data[3] = 1;
		mat2.data[4] = 6;
		mat2.data[5] = 7;
		mat2.data[6] = 1;
		mat2.data[7] = 1;
		mat2.data[8] = 1;
		mat2.data[9] = 8;
		mat2.data[10] = 1;
		mat2.data[11] = 1;
		mat2.data[12] = 1;
		mat2.data[13] = 1;
		mat2.data[14] = 10;
		mat2.data[15] = 1;

		console.log(Matrix4x4.multiply(mat1, mat2));
	}

	public toFloat32Array():Float32Array {
		return new Float32Array(this.data);
	}
	
	public clone():Matrix4x4 {
		let m = new Matrix4x4();
		m.copyFrom(this);
		return m;
	}
}
