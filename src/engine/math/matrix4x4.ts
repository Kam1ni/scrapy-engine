import { Quaternion } from "./quaternion";
import { Vector3 } from "./vector3";
import { Vector4 } from "./vector4";

export class Matrix4x4 {
	public data:number[] = [];

	protected constructor() {
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

	public translate(vector:Vector3):Matrix4x4 {
		return this.multiply(Matrix4x4.translation(vector));
	}

	public rotateXYZ(rotation:Vector3):Matrix4x4 {
		return this.multiply(Matrix4x4.rotationXYZ(rotation));
	}

	public scale(scale:Vector3):Matrix4x4 {
		return this.multiply(Matrix4x4.scale(scale));
	}

	public multiply(b:Matrix4x4):Matrix4x4 {
		let m = new Matrix4x4();
		let a = this;
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

	public inverse():Matrix4x4 {
		let m00 = this.data[0 * 4 + 0];
		let m01 = this.data[0 * 4 + 1];
		let m02 = this.data[0 * 4 + 2];
		let m03 = this.data[0 * 4 + 3];
		let m10 = this.data[1 * 4 + 0];
		let m11 = this.data[1 * 4 + 1];
		let m12 = this.data[1 * 4 + 2];
		let m13 = this.data[1 * 4 + 3];
		let m20 = this.data[2 * 4 + 0];
		let m21 = this.data[2 * 4 + 1];
		let m22 = this.data[2 * 4 + 2];
		let m23 = this.data[2 * 4 + 3];
		let m30 = this.data[3 * 4 + 0];
		let m31 = this.data[3 * 4 + 1];
		let m32 = this.data[3 * 4 + 2];
		let m33 = this.data[3 * 4 + 3];
		let tmp_0  = m22 * m33;
		let tmp_1  = m32 * m23;
		let tmp_2  = m12 * m33;
		let tmp_3  = m32 * m13;
		let tmp_4  = m12 * m23;
		let tmp_5  = m22 * m13;
		let tmp_6  = m02 * m33;
		let tmp_7  = m32 * m03;
		let tmp_8  = m02 * m23;
		let tmp_9  = m22 * m03;
		let tmp_10 = m02 * m13;
		let tmp_11 = m12 * m03;
		let tmp_12 = m20 * m31;
		let tmp_13 = m30 * m21;
		let tmp_14 = m10 * m31;
		let tmp_15 = m30 * m11;
		let tmp_16 = m10 * m21;
		let tmp_17 = m20 * m11;
		let tmp_18 = m00 * m31;
		let tmp_19 = m30 * m01;
		let tmp_20 = m00 * m21;
		let tmp_21 = m20 * m01;
		let tmp_22 = m00 * m11;
		let tmp_23 = m10 * m01;

		let t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
			(tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
		let t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
			(tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
		let t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
			(tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
		let t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
			(tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

		let d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

		let matrix = new Matrix4x4();
		matrix.data= [
			d * t0,
			d * t1,
			d * t2,
			d * t3,
			d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
			d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
			d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
			d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
			d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
			d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
			d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
			d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
			d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -	(tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
			d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -	(tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
			d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -	(tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
			d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -	(tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
		];
		return matrix;
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
		fov = Math.PI - fov;
		let width = right - left;
		let height = top - bottom;

		let aspect = width / height;
		let f = Math.tan(fov / 2);
		let rangeInv = 1.0 / (nearClip - farClip);


		let m = Matrix4x4.identity();
		m.data = [
			f/aspect, 0,0 ,0,
			0, f, 0,0,
			0,0, (nearClip + farClip) * rangeInv, - 1,
			0,0, nearClip * farClip * rangeInv * 2, 0
		];
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
		let m = Matrix4x4.identity();

		let c = Math.cos(angleInRadians);
		let s = Math.sin(angleInRadians);

		m.data[5] = c;
		m.data[6] = s;
		m.data[9] = -s;
		m.data[10] = c;

		return m;
	}


	public static rotationY(angleInRadians:number):Matrix4x4 {
		let m = Matrix4x4.identity();

		let c = Math.cos(angleInRadians);
		let s = Math.sin(angleInRadians);

		m.data[0] = c;
		m.data[2] = -s;
		m.data[8] = s;
		m.data[10] = c;

		return m;
	}

	public static rotationZ(angleInRadians:number):Matrix4x4 {
		let m = Matrix4x4.identity();

		let c = Math.cos(angleInRadians);
		let s = Math.sin(angleInRadians);

		m.data[0] = c;
		m.data[1] = s;
		m.data[4] = -s;
		m.data[5] = c;

		return m;
	}

	public static rotationXYZ(rotation:Vector3):Matrix4x4 {
		let rx = Matrix4x4.rotationX(rotation.x);
		let ry = Matrix4x4.rotationY(rotation.y);
		let rz = Matrix4x4.rotationZ(rotation.z);

		return rx.multiply(ry).multiply(rz);
	}

	public static rotation(rotation:Vector3, order:string = "XYZ"):Matrix4x4 {
		let getRotationMatrix = function(axis:string):Matrix4x4{
			if (axis == "X") {
				return Matrix4x4.rotationX(rotation.x);
			}else if (axis == "Y") {
				return Matrix4x4.rotationY(rotation.y);
			}
			return Matrix4x4.rotationZ(rotation.z);

		};
		return getRotationMatrix(order[0]).multiply(getRotationMatrix(order[1])).multiply(getRotationMatrix(order[2]));
	}

	public static quaternionRotation(q:Quaternion):Matrix4x4{
		let xx = q.x * q.x;
		let yy = q.y * q.y;
		let zz = q.z * q.z;
		let wx = q.w * q.x;
		let wy = q.w * q.y;
		let wz = q.w * q.z;
		let xy = q.x * q.y;
		let xz = q.x * q.z;
		let yz = q.y * q.z;

		let mat = Matrix4x4.identity();
		mat.data[0] = 1 - 2 * (yy + zz);
		mat.data[1] = 2 * (xy - wz);
		mat.data[2] = 2 * (xz + wy);
		mat.data[4] = 2 * (xy + wz);
		mat.data[5] = 1 - 2 * (xx + zz);
		mat.data[6] = 2 * (yz - wx);
		mat.data[8] = 2 * (xz - wy);
		mat.data[9] = 2 * (yz + wx);
		mat.data[10] = 1 - 2 * (xx + yy);
		return mat;
	}


	public static scale(scale:Vector3):Matrix4x4 {
		let m = new Matrix4x4();

		m.data[0] = scale.x;
		m.data[5] = scale.y;
		m.data[10] = scale.z;

		return m;
	}

	public getTranslation():Vector3 {
		return new Vector3(this.data[12], this.data[13], this.data[14]);
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

	public toFloat32Array():Float32Array {
		return new Float32Array(this.data);
	}

	public clone():Matrix4x4 {
		let m = new Matrix4x4();
		m.copyFrom(this);
		return m;
	}
}
