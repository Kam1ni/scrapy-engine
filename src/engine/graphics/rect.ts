import { Engine } from "../engine";
import { Color } from "./color";
import { Matrix4x4 } from "../math/matrix4x4";
import { Graphic } from "./graphic";

export class Rect extends Graphic{
	private width:number;
	private height:number;
	public color:Color = Color.white();

	public constructor(engine:Engine, width:number = 10, height:number = 10, color:Color = Color.white()) {
		super(engine);
		this.width = width;
		this.height = height;
		this.color = color;
	}

	public render(transform:Matrix4x4):void {
		this.engine.staticGraphics.getRect().render(transform, this.width, this.height, this.color);
	}

	
}