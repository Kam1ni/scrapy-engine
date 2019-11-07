import { Engine } from "../engine";
import { Matrix4x4 } from "../math/matrix4x4";

export abstract class Graphic {
	protected engine:Engine;
	constructor(engine:Engine) {
		this.engine = engine;
	}

	public load():void {}

	public update(dt:number):void {}

	public render(transform:Matrix4x4):void {}

	public destroy():void {}
}