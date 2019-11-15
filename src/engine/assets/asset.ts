import { Engine } from "../engine";
import { Matrix4x4 } from "../math/matrix4x4";
import { Vector3 } from "../math/vector3";

export abstract class Asset {
	protected engine:Engine;
	protected loaded:boolean;

	constructor(engine:Engine) {
		this.engine = engine;
	}

	public load():void {}

	public update(dt:number):void {}

	public destroy():void {}

	public isLoaded():boolean {
		return this.loaded;
	}
}