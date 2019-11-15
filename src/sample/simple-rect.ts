import { SimObject } from "@/engine/world/sim-object";
import { Rect } from "@/engine/graphics/rect";
import { Color } from "@/engine/graphics/color";
import { Sprite } from "@/engine/graphics/sprite";
import * as woodTexture from "assets/textures/wood.png";
import { Texture } from "@/engine/assets/texture";
import { Graphic } from "@/engine/graphics/graphic";

export class SimpleRect extends SimObject {
	protected graphics:Graphic[] = [new Rect(this.engine, 100, 100, Color.red())];

	public load():void {
		super.load();
		console.log(woodTexture);
		let tex = new Texture(this.engine, woodTexture);
		tex.load();
		let sprite = new Sprite(this.engine, tex);
		this.graphics.push(sprite);
	}

	public render():void {
		super.render();
	}
}