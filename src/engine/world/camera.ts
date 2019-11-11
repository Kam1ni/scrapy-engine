import { Transform } from "../math/transform";
import { Matrix4x4 } from "../math/matrix4x4";
import { Engine } from "../engine";
import { Vector3 } from "../math/vector3";

export abstract class Camera{
	public transform:Transform = new Transform();
	public engine:Engine;
	protected matrix:Matrix4x4;

	constructor(engine:Engine) {
		this.engine = engine;
	}

	public getMatrix():Matrix4x4 {
		return this.matrix.clone();
	}

	public abstract updateMatrix():void;

	public transformMatrixToScreenPosition(worldMatrix:Matrix4x4, position:Vector3):Vector3 {
		let viewProjectionMatrix = Matrix4x4.multiply(this.transform.getTransformationMatrix(), this.getMatrix());
		let b = Matrix4x4.multiply(worldMatrix, viewProjectionMatrix);
		return Transform.fromMatrix(b).position;
	}

	public getViewMatrix():Matrix4x4 {
		return Matrix4x4.multiply(this.getMatrix(), this.transform.getTransformationMatrix());
	}
}