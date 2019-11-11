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

	public getTransformationMatrix():Matrix4x4 {
		let translation = Matrix4x4.translation(this.position);
		let rotation = Matrix4x4.rotationXYZ(this.rotation.x,this.rotation.y,this.rotation.z);
		let scale = Matrix4x4.scale(this.scale);

		return Matrix4x4.multiply(Matrix4x4.multiply(translation, rotation), scale);
	}

	public static fromMatrix(matrix:Matrix4x4):Transform {
		let transform = new Transform();
	//	matrix = Matrix4x4.multiply(Matrix4x4.scale(new Vector3(-4,-4,1)), matrix);
	//	matrix = Matrix4x4.multiply(Matrix4x4.rotationXYZ(0,0,-1.0), matrix);

		let data = matrix.getData();
		transform.position.x = data[12];
		transform.position.y = -data[13];
		transform.position.z = data[14];

		// TODO: do scale and rotation

		return transform;
	}
}