import { Matrix4x4 } from "./matrix4x4";
import { EulerRotationOrder } from "./transform";
import { Vector3 } from "./vector3";

export class Quaternion {
	public w:number = 1;
	public x:number = 0;
	public y:number = 0;
	public z:number = 0;

	public toMatrix():Matrix4x4{
		return Matrix4x4.quaternionRotation(this);
	}

	public copyFrom(quat:Quaternion){
		this.w = quat.w;
		this.x = quat.x;
		this.y = quat.y;
		this.z = quat.z;
	}

	public static multiply(q1:Quaternion, q2:Quaternion):Quaternion {
		let result = new Quaternion();
		result.w = q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z;
		result.x = q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y;
		result.y = q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x;
		result.z = q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w;
		return result;
	}

	public static normalize(q:Quaternion):Quaternion {
		let norm = Math.sqrt(q.w ** 2 + q.x ** 2 + q.y ** 2 + q.z ** 2);
		let result = new Quaternion();
		result.w = q.w / norm;
		result.x = q.x / norm;
		result.y = q.y / norm;
		result.z = q.z / norm;
		return result;
	}

	public static fromEuler(vector:Vector3, order:EulerRotationOrder = "XYZ"):Quaternion{
		let pitch = (vector.x * Math.PI) / 180;
		let yaw = (vector.y * Math.PI) / 180;
		let roll = (vector.z * Math.PI) / 180;

		let cy = Math.cos(yaw * 0.5);
		let sy = Math.sin(yaw * 0.5);
		let cp = Math.cos(pitch * 0.5);
		let sp = Math.sin(pitch * 0.5);
		let cr = Math.cos(roll * 0.5);
		let sr = Math.sin(roll * 0.5);

		let result = new Quaternion();

		switch (order) {
		case "XYZ":
			result.w = cr * cp * cy + sr * sp * sy;
			result.x = sr * cp * cy - cr * sp * sy;
			result.y = cr * sp * cy + sr * cp * sy;
			result.z = cr * cp * sy - sr * sp * cy;
			break;
		case "YXZ":
			result.w = cr * cp * cy + sr * sp * sy;
			result.x = sr * cp * cy + cr * sp * sy;
			result.y = cr * sp * cy - sr * cp * sy;
			result.z = cr * cp * sy - sr * sp * cy;
			break;
		case "ZYX":
			result.w = cr * cp * cy + sr * sp * sy;
			result.x = sr * cp * cy - cr * sp * sy;
			result.y = cr * sp * cy - sr * cp * sy;
			result.z = cr * cp * sy + sr * sp * cy;
			break;
		default:
			throw new Error("Invalid rotation order");
		}
		return result;
	}

	public toString(precision:number = 10):string{
		return `w:${this.w.toFixed(precision)}, x:${this.x.toFixed(precision)}, y:${this.y.toFixed(precision)}, z:${this.z.toFixed(precision)}`;
	}
}