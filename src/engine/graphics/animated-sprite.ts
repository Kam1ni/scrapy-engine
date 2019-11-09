import { Sprite } from "./sprite";
import { Engine } from "../engine";
import { Texture } from "./texture";

export class AnimatedSprite extends Sprite {
	private rows:number = 1;
	private cols:number = 1;
	private renderedLocation:{x:number, y:number} = {x:0, y:0};

	constructor(engine:Engine, texture:Texture, rows:number, cols:number) {
		super(engine, texture);
		this.rows = rows;
		this.cols = cols;
	}

	protected onTextureLoad():void {
		this.updateBuffer();
		this.buffer.unbind();
	}

	private updateBuffer():void {
		let height = this.texture.getHeight() / this.rows;
		let width = this.texture.getWidth() / this.cols;

		let minV = (1 / this.rows) * (this.renderedLocation.y);
		let minU = (1 / this.cols) * (this.renderedLocation.x);

		let v = (1 / this.rows) * (this.renderedLocation.y + 1);
		let u = (1 / this.cols) * (this.renderedLocation.x + 1);

		let vertices = [
			// x, y, x, u, v
			0, 0, 0, minU, minV,
			0, height, 0, minU, v,
			height, width, 0, u, v,

			height, width, 0, u, v,
			height, 0, 0, u, minV,
			0, 0, 0, minU, minV,
		];
		
		this.buffer.setData(vertices);
		this.buffer.upload();
	}

	public setRenderedLocation(x:number, y:number):void {
		this.renderedLocation = {x,y};
		this.buffer.bind();
		this.updateBuffer();
		this.buffer.unbind();
	}

	public getRenderedLocation():{x:number, y:number} {
		return {
			x:this.renderedLocation.x,
			y:this.renderedLocation.y
		};
	}
}