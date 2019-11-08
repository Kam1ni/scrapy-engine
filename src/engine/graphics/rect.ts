import { Graphic } from "./graphic";
import { Engine } from "../engine";
import { Transform } from "../math/transform";
import { Color } from "./color";
import { GLBuffer, AttributeInfo } from "./gl-buffer";
import { Matrix4x4 } from "../math/matrix4x4";

export class Rect extends Graphic {
	private width:number;
	private height:number;
	public color:Color = Color.white();
	private loaded:boolean = false;
	private buffer:GLBuffer;

	public constructor(engine:Engine, width:number = 10, height:number = 10, color:Color = Color.white()) {
		super(engine);
		this.width = width;
		this.height = height;
		this.color = color;
	}

	public destroy():void {
		if (!this.loaded) return;
		super.destroy();
		this.buffer.destroy();
	}

	public load():void {
		if (this.loaded) return;
		this.buffer = new GLBuffer(this.engine, 3);
		let positionAttribute = new AttributeInfo();
		positionAttribute.location = this.engine.getShader().getAttributeLocation("a_position");
		positionAttribute.offset = 0;
		positionAttribute.size =3;
		this.buffer.addAttributeLocation(positionAttribute);
		
		let vertices = [
			0,0,0,
			0,this.height,0,
			this.width, this.height, 0,
			this.width, this.height, 0,
			this.width, 0,0,
			0,0,0,
		];
		
		this.buffer.pushBackData(vertices);
		this.buffer.upload();
		this.buffer.unbind();
		this.loaded = true;
	}

	public render(transform:Matrix4x4):void {
		let colorLocation = this.engine.getShader().getUniformLocation("u_color");
		this.engine.gl.uniform4fv(colorLocation, this.color.toFloat32Array());

		let transformLocation = this.engine.getShader().getUniformLocation("u_transform");
		this.engine.gl.uniformMatrix4fv(transformLocation, false, transform.toFloat32Array());

		this.buffer.bind();
		this.buffer.draw();
		super.render(transform);
		this.buffer.unbind();
	}
}