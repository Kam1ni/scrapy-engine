import { SimObject } from "@/engine/world/sim-object";
import { Sprite } from "@/engine/graphics/sprite";
import { Texture } from "@/engine/graphics/texture";
import { B3NElement } from "./b3n-element";

export class B3N extends SimObject {
	private b3nObject:SimObject;

	public load():void {
		this.b3nObject = new B3NElement(this.engine);
		this.addChild(this.b3nObject);
		super.load();
		this.b3nObject.transform.position.y = 64;
	}

	public update(dt:number):void {
		super.update(dt);
	}
}
