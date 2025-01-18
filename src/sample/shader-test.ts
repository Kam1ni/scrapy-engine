import { Rect } from "@/engine/world";
import { Engine } from "@/engine/engine";
import { BaseWorld } from "./base-world";
import { Color } from "@/engine/graphics";

export class ShaderTest extends BaseWorld {
	rect:Rect;

	public constructor(engine:Engine){
		super(engine);

		let rect = new Rect(this.engine);
		rect.color = Color.green();
		this.addChild(rect);
		this.rect = rect;
	}

	public update(dt:number){
		super.update(dt);
	}
}