import { Transform } from "../math/transform";
import { Matrix4x4 } from "../math/matrix4x4";
import { Engine } from "../engine";

export abstract class Camera{
	public transform:Transform = new Transform();
	public engine:Engine;
	public worldMatrix:Matrix4x4;
	protected matrix:Matrix4x4;

	constructor(engine:Engine) {
		this.engine = engine;
	}

	public getMatrix():Matrix4x4 {
		return this.matrix.clone();
	}

	public abstract updateMatrix():void;

	public getViewMatrix():Matrix4x4 {
		return this.getMatrix().multiply(this.worldMatrix);
	}
	
	public update(dt:number):void {
		this.worldMatrix = this.transform.getInvertedTransformationMatrix();
	}
}