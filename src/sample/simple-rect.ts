import { Rect } from "@/engine/world/rect";
import { Color } from "@/engine/graphics/color";
import { Engine } from "@/engine/engine";

export class SimpleRect extends Rect {
	public constructor(engine:Engine) {
		super(engine, 100, 100, Color.red());
	}
}