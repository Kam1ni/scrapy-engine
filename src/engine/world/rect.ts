import { Engine } from "../engine";
import { Color } from "../graphics/color";
import { SimObject } from "./sim-object";

export class Rect extends SimObject{
	private width:number;
	private height:number;
	public color:Color = Color.white();

	public constructor(engine:Engine, width:number = 10, height:number = 10, color:Color = Color.white()) {
		super(engine);
		this.width = width;
		this.height = height;
		this.color = color;
	}

	public render():void {
		this.engine.staticGraphics.getRect().render(this.worldMatrix, this.width, this.height, this.color);
		super.render();
	}

	
}