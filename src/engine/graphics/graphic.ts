import { Asset } from "../assets/asset";
import { Engine } from "../engine";
import { Matrix4x4 } from "../math/matrix4x4";

export abstract class Graphic {
	protected engine:Engine;
	protected assets:Asset[] = [];

	public constructor(engine:Engine) {
		this.engine = engine;
	}

	public abstract render(transform:Matrix4x4):void;
}