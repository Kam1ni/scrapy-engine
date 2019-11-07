import { Vector3 } from "./vector3";

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

	public static identity():Matrix4x4 {
		return new Matrix4x4();
	}

	public static orthographic(left:number, right:number, bottom:number, top:number, nearClip:number, farClip:number):Matrix4x4 {
		let m = new Matrix4x4();

		// This is done with documentation. TUTORIAL IS WRONG
		m.data[0] = 2 / (right - left);
		m.data[5] = 2 / (top - bottom);
		m.data[10] = -2 / (farClip - nearClip);

		m.data[12] = -(right + left) / (right -left);
		m.data[13] = -(top + bottom) / (top - bottom);
		m.data[14] = -(farClip + nearClip) / (farClip - nearClip);

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

	public toFloat32Array():Float32Array {
		return new Float32Array(this.data);
	}
}