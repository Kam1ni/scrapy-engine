import { Transform } from "../math/transform";
import { Matrix4x4 } from "../math/matrix4x4";
import { Engine } from "../engine";
import { GameContainer } from "./game-container";

export abstract class Camera extends GameContainer{
	protected matrix:Matrix4x4;

	constructor(engine:Engine) {
		super(engine);
	}

	public getMatrix():Matrix4x4 {
		return this.matrix.clone();
	}

	public abstract updateMatrix():void;

	public getViewMatrix():Matrix4x4 {
		return this.worldMatrix;
	}

	public update(dt:number):void {
		this.worldMatrix = this.transform.getTransformationMatrix();
	}

	public render():void{
		return;
	}
}