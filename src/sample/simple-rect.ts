import { SimObject } from "@/engine/world/sim-object";
import { Graphic } from "@/engine/graphics/graphic";
import { Rect } from "@/engine/graphics/rect";
import { Color } from "@/engine/graphics/color";

export class SimpleRect extends SimObject {
	protected graphics:Graphic[] = [
		new Rect(this.engine, 500, 200, Color.red())
	];

	public render():void {
		super.render();
	}
}