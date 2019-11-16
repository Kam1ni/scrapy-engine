import { SimObject } from "@/engine/world/sim-object";
import { Rect } from "@/engine/graphics/rect";
import { Color } from "@/engine/graphics/color";
import { Sprite } from "@/engine/graphics/sprite";
import { Graphic } from "@/engine/graphics/graphic";

export class SimpleRect extends SimObject {
	protected graphics:Graphic[] = [new Rect(this.engine, 100, 100, Color.red())];

	public load():void {
		super.load();
		let sprite = new Sprite(this.engine, "wood.png");
		this.graphics.push(sprite);
	}

	public render():void {
		super.render();
	}
}