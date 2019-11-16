import { Sprite } from "./sprite";
import { Engine } from "../engine";
import { Vector2 } from "@/engine/math/vector2";
import { Color } from "../graphics/color";

export class AnimatedSprite extends Sprite {
	private rows:number = 1;
	private cols:number = 1;
	private renderedLocation:{x:number, y:number} = {x:0, y:0};
	private uvOffset:Vector2 = Vector2.zero();
	private uvSize:Vector2 = Vector2.one();

	constructor(engine:Engine, texture:string, rows:number, cols:number) {
		super(engine, texture);
		this.rows = rows;
		this.cols = cols;
		this.uvSize.x = 1.0 / this.cols;
		this.uvSize.y = 1.0 / this.rows;
	}

	public setRenderedLocation(x:number, y:number):void {
		this.renderedLocation = {x,y};
		this.uvOffset.x = this.uvSize.x * x;
		this.uvOffset.y = this.uvSize.y * y;
	}

	public getRenderedLocation():{x:number, y:number} {
		return {
			x:this.renderedLocation.x,
			y:this.renderedLocation.y
		};
	}

	public render():void {
		let uvOffset = this.engine.getShader().getUniformLocation("u_uvOffset");
		this.engine.gl.uniform2fv(uvOffset, this.uvOffset.toFloat32Array());
		let uvSize = this.engine.getShader().getUniformLocation("u_uvSize");
		this.engine.gl.uniform2fv(uvSize, this.uvSize.toFloat32Array());

		this.engine.staticGraphics.getRect().render(this.worldMatrix, this.uvSize.x * this.texture.getWidth(), this.uvSize.x * this.texture.getWidth(), Color.white(), this.texture);
		
		this.engine.gl.uniform2fv(uvOffset, new Float32Array([0.0,0.0]));
		this.engine.gl.uniform2fv(uvSize, new Float32Array([1.0,1.0]));

		for (let child of this.getChildren()) {
			child.render();
		}
	}
}