import { SimObject } from "@/engine/world/sim-object";
import { Engine } from "@/engine/engine";
import { Sprite } from "@/engine/graphics/sprite";

export class Block extends SimObject {
	constructor(engine:Engine, sprite:Sprite) {
		super(engine);
		this.graphics.push(sprite);
	}
}