import { Engine } from "../engine";
import { GLBuffer, AttributeInfo } from "./gl-buffer";
import { Graphic } from "./graphic";
import { Color } from "./color";
import { Matrix4x4 } from "../math/matrix4x4";

export class Mesh extends Graphic {
	protected buffer:GLBuffer;
	protected vertices:number[];
	public color:Color = Color.white();

	public constructor(engine:Engine, vertices:number[]) {
		super(engine);
		this.vertices = vertices;
	}

	public load():void {
		this.buffer = new GLBuffer(this.engine, 5);
		this.buffer.bind();

		let positionAttribute = this.engine.getShader().getAttributeLocation("a_position");
		let info = new AttributeInfo();
		info.location = positionAttribute;
		info.size = 3;
		info.offset = 0;
		this.buffer.addAttributeLocation(info);

		let textCoordAttribute = this.engine.getShader().getAttributeLocation("a_texCoord");
		info = new AttributeInfo();
		info.location = textCoordAttribute;
		info.size = 2;
		info.offset = 3;
		this.buffer.addAttributeLocation(info);

		this.buffer.setData(this.vertices);
		this.buffer.upload();
		this.buffer.unbind();

		let gl = this.engine.gl;
		this.engine.staticGraphics.getDiffusetTexture().bind();
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1,1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255,255,255,255]));
		this.engine.staticGraphics.getDiffusetTexture().unbind();
	}

	public destroy():void {
		this.buffer.destroy();
	}

	public render(transform:Matrix4x4):void {
		let colorLocation = this.engine.getShader().getUniformLocation("u_color");
		this.engine.gl.uniform4fv(colorLocation, this.color.toFloat32Array());

		let transformLocation = this.engine.getShader().getUniformLocation("u_transform");
		this.engine.gl.uniformMatrix4fv(transformLocation, false, transform.toFloat32Array());

		this.engine.staticGraphics.getDiffusetTexture().activateAndBind(0);
		let diffuseLocation = this.engine.getShader().getUniformLocation("u_diffuse");
		this.engine.gl.uniform1i(diffuseLocation, 0);

		this.buffer.bind();
		this.buffer.draw();
		super.render(transform);
		this.buffer.unbind();
	}

}