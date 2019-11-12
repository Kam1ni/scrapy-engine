import { Graphic } from "./graphic";
import { Texture } from "./texture";
import { Engine } from "../engine";
import { GLBuffer, AttributeInfo } from "./gl-buffer";
import { Matrix4x4 } from "../math/matrix4x4";
import { Color } from "./color";

export class Sprite extends Graphic {
	protected texture:Texture;
	protected buffer:GLBuffer;

	constructor(engine:Engine, texture:Texture) {
		super(engine);
		this.texture = texture;
	}

	public destroy():void {
		this.buffer.destroy();
		this.texture.offByBinding(this);
	}

	public load():void {
		this.buffer = new GLBuffer(this.engine, 5);
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
		this.texture.load();

		this.onTextureLoad();
		this.texture.on("loaded", this.onTextureLoad, this);
	}

	
	
	protected onTextureLoad():void {
		let vertices = [
			// x, y, x, u, v
			0, 0, 0, 1.0, 1.0,
			0, this.texture.getHeight(), 0, 1.0, 0.0,
			this.texture.getWidth(), this.texture.getHeight(), 0, 0.0, 0.0,

			this.texture.getWidth(), this.texture.getHeight(), 0, 0.0, 0.0,
			this.texture.getWidth(), 0, 0, 0.0, 1.0,
			0, 0, 0, 1.0, 1.0,
		];
		
		this.buffer.setData(vertices);
		this.buffer.upload();
		this.buffer.unbind();
	}
	
	public render(transform:Matrix4x4):void {
		let colorLocation = this.engine.getShader().getUniformLocation("u_color");
		this.engine.gl.uniform4fv(colorLocation, Color.white().toFloat32Array());

		let transformLocation = this.engine.getShader().getUniformLocation("u_transform");
		this.engine.gl.uniformMatrix4fv(transformLocation, false, transform.toFloat32Array());

		this.texture.activateAndBind(0);
		let diffuseLocation = this.engine.getShader().getUniformLocation("u_diffuse");
		this.engine.gl.uniform1i(diffuseLocation, 0);
		
		this.buffer.bind();
		this.buffer.draw();
		super.render(transform);
		this.buffer.unbind();
	}
}