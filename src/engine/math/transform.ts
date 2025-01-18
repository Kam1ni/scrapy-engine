import { Vector3 } from "./vector3";
import { Matrix4x4 } from "./matrix4x4";
import { Quaternion } from "./quaternion";

export type EulerRotationOrder = "XYZ" | "YXZ" | "ZYX"

export class Transform {
	public position:Vector3 = Vector3.zero();
	public rotation:Quaternion = new Quaternion();
	public scale:Vector3 = Vector3.one();

	public copyFrom(transform:Transform):void {
		this.position.copyFrom(transform.position);
		this.rotation.copyFrom(transform.rotation);
		this.scale.copyFrom(transform.scale);
	}

	public getTransformationMatrix():Matrix4x4 {
		let translation = Matrix4x4.translation(this.position);
		let rotation = this.rotation.toMatrix();
		let scale = Matrix4x4.scale(this.scale);

		return translation.multiply(rotation).multiply(scale);
	}

	public getInvertedTransformationMatrix():Matrix4x4 {
		let translation = Matrix4x4.translation(this.position);
		let rotation = this.rotation.toMatrix(); //Matrix4x4.rotation(this.rotation, rotationOrder);
		let scale = Matrix4x4.scale(this.scale);

		return rotation.multiply(translation).multiply(scale);
	}

}