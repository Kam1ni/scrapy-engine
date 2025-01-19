import { Engine } from "../engine";
import { Color } from "../graphics/color";
import { Matrix4x4, Vector3 } from "../math";
import { Plane } from "../utils/plane";
import { SimObject } from "./sim-object";

export class Rect extends SimObject{
	private width:number;
	private height:number;
	private plane:Plane;
	public renderRect:boolean = true;
	public renderBorder:boolean = false;
	public color:Color = Color.white();
	public borderColor:Color = Color.white();

	public constructor(engine:Engine, width:number = 10, height:number = 10, color:Color = Color.white()) {
		super(engine);
		this.width = width;
		this.height = height;
		this.color = color;
		this.borderColor = color;
		this.plane = new Plane(this.width, this.height);
	}

	public render():void {
		if (this.renderRect) {
			let offset = new Vector3(-this.width/2, -this.height/2);
			this.engine.staticGraphics.getRect().render(this.worldMatrix.multiply(Matrix4x4.translation(offset)), this.width, this.height, this.color);
			super.render();
		}
		if (this.renderBorder){
			this.renderBorderFunc();
		}
	}

	private renderBorderFunc():void{
		let corners = this.getCorners();
		for (let i = 0; i < 4; i++) {
			let corner1 = corners[i];
			let c = i+1;
			if (c >= 4) {
				c = 0;
			}
			let corner2 = corners[c];
			this.engine.staticGraphics.getLine().render(corner1, corner2, this.borderColor);
		}
	}

	public getCorners():Vector3[] {
		return this.plane.getCorners(this.getWorldMatrix());
	}
}