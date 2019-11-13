import { Sprite } from "./sprite";
import { Engine } from "../engine";
import { Texture } from "./texture";
import { Vector2 } from "@/engine/math/vector2";
import { Matrix4x4 } from "@/engine/math/matrix4x4";

export class AnimatedSprite extends Sprite {
	private rows:number = 1;
	private cols:number = 1;
	private renderedLocation:{x:number, y:number} = {x:0, y:0};
	private uvOffset:Vector2 = Vector2.zero();
	private uvSize:Vector2 = Vector2.one();

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
		let totalWidth = this.texture.getWidth();
		let totalHeight = this.texture.getHeight();
		let height = totalWidth / this.rows;
		let width = totalHeight / this.cols;

		// Fixes an anoying line that folows you
		let minUOffset = 0.0001 * height * 2;
		let minVOffset = 0.0001 * width * 2;
		let vertices = [
			// x, y, x, u, v
			0, 0, 0, minUOffset, 1.0,
			0, height, 0, minUOffset, minVOffset,
			width, height, 0, 1.0, minVOffset,

			width, height, 0, 1.0, minVOffset,
			width, 0, 0, 1.0, 1.0,
			0, 0, 0, minUOffset, 1.0,
		];
		
		this.buffer.setData(vertices);
		this.buffer.upload();
		this.buffer.unbind();
		
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

	public render(transform:Matrix4x4):void {
		let uvOffset = this.engine.getShader().getUniformLocation("u_uvOffset");
		this.engine.gl.uniform2fv(uvOffset, this.uvOffset.toFloat32Array());

		let uvSize = this.engine.getShader().getUniformLocation("u_uvSize");
		this.engine.gl.uniform2fv(uvSize, this.uvSize.toFloat32Array());

		super.render(transform);

		this.engine.gl.uniform2fv(uvOffset, new Float32Array([0.0,0.0]));
		this.engine.gl.uniform2fv(uvSize, new Float32Array([1.0,1.0]));
	}
}