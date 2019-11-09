import { SimObject } from "@/engine/world/sim-object";
import { Graphic } from "@/engine/graphics/graphic";
import { Rect } from "@/engine/graphics/rect";
import { Color } from "@/engine/graphics/color";
import { Sprite } from "@/engine/graphics/sprite";
import * as woodTexture from "assets/textures/wood.png";
import { Texture } from "@/engine/graphics/texture";

export class SimpleRect extends SimObject {
	protected graphics:Graphic[] = [
	//	new Rect(this.engine, 100, 100, Color.red()),
];

	public load():void {
		super.load();
		console.log(woodTexture);
		let tex = new Texture(this.engine, woodTexture);
		let sprite = new Sprite(this.engine, tex);
		sprite.load();
		this.graphics.push(sprite);
	}

	public render():void {
		super.render();
	}
}