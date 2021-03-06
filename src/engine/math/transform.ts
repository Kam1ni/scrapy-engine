import { Vector3 } from "./vector3";
import { Matrix4x4 } from "./matrix4x4";
import { Vector4 } from "./vector4";

export class Transform {
	public position:Vector3 = Vector3.zero();
	public rotation:Vector3 = Vector3.zero();
	public scale:Vector3 = Vector3.one();

	public copyFrom(transform:Transform):void {
		this.position.copyFrom(transform.position);
		this.rotation.copyFrom(transform.rotation);
		this.scale.copyFrom(transform.scale);
	}

	public getTransformationMatrix(rotationOrder:string = "XYZ"):Matrix4x4 {
		let translation = Matrix4x4.translation(this.position);
		let rotation = Matrix4x4.rotation(this.rotation, rotationOrder);
		let scale = Matrix4x4.scale(this.scale);

		return translation.multiply(rotation).multiply(scale);
	}

	public getInvertedTransformationMatrix(rotationOrder:string = "XYZ"):Matrix4x4 {
		let translation = Matrix4x4.translation(this.position);
		let rotation = Matrix4x4.rotation(this.rotation, rotationOrder);
		let scale = Matrix4x4.scale(this.scale);

		return rotation.multiply(translation).multiply(scale);
	}

	public static fromMatrix(matrix:Matrix4x4):Transform {
		let t = new Transform();
		t.position = matrix.getTranslation();
		t.rotation = matrix.getRotation();
		t.scale = matrix.getScaling();
		return t;
	}
}