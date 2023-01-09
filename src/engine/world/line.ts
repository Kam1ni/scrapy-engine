import { Engine } from "../engine";
import { Color } from "../graphics";
import { Vector3 } from "../math";
import { SimObject } from "./sim-object";

export class Line extends SimObject {
	public pos1:Vector3;
	public pos2:Vector3;
	public color:Color;

	public constructor(engine:Engine, pos1:Vector3, pos2:Vector3, color:Color = Color.white()) {
		super(engine);
		this.pos1 = pos1;
		this.pos2 = pos2;
		this.color = color;
	}


	public render():void {
		this.engine.staticGraphics.getLine().render(this.pos1, this.pos2, this.color);
		super.render();
	}
}