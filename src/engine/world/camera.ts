import { Transform } from "../math/transform";
import { Matrix4x4 } from "../math/matrix4x4";
import { Engine } from "../engine";

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

	public getViewMatrix():Matrix4x4 {
		return Matrix4x4.multiply(this.getMatrix(), this.transform.getTransformationMatrix());
	}
}