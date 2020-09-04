import { Asset } from "./asset";
import { Vector3, Matrix4x4 } from "../math";
import { GLBuffer, Color } from "../graphics";
import { AttributeInfo } from "../graphics/gl-buffer";
import { Texture } from "./texture";
import { Engine } from "../engine";

export class Box extends Asset {
	protected buffer:GLBuffer;

	public constructor(engine:Engine) {
		super(engine, "box");
	}

	public async load():Promise<void> {
		if (this.loaded) return;
		let gl = this.engine.gl;
		this.buffer = new GLBuffer(this.engine, 5, gl.FLOAT, gl.ARRAY_BUFFER, gl.LINES);
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

		let vertices = [
			-0.5, -0.5, -0.5, 0, 0,
			0.5, -0.5, -0.5, 1, 1,

			-0.5, -0.5, -0.5, 0, 0,
			-0.5,  0.5, -0.5, 1, 1,

			-0.5, -0.5, -0.5, 0, 0,
			-0.5, -0.5,  0.5, 1, 1,

			0.5,  0.5,  0.5, 0, 0,
			-0.5,  0.5,  0.5, 1, 1,

			0.5,  0.5,  0.5, 0, 0,
			0.5, -0.5,  0.5, 1, 1,

			0.5,  0.5,  0.5, 0, 0,
			0.5,  0.5, -0.5, 1, 1,

			0.5, -0.5, -0.5, 0, 0,
			0.5, -0.5,  0.5, 1, 1,

			-0.5, -0.5,  0.5, 0, 0,
			0.5, -0.5,  0.5, 1, 1,

			-0.5,  0.5, -0.5, 0, 0,
			0.5,  0.5, -0.5, 1, 1,

			-0.5,  0.5, -0.5, 0, 0,
			-0.5,  0.5,  0.5, 1, 1,

			-0.5, -0.5,  0.5, 0, 0,
			-0.5,  0.5,  0.5, 1, 1,

			0.5, -0.5, -0.5, 0, 0,
			0.5,  0.5, -0.5, 1, 1,
		];

		this.buffer.pushBackData(vertices);
		this.buffer.upload();
		this.buffer.unbind();
		
		this.loaded = true;
	}

	public destroy():void {
		this.buffer.destroy();
	}

	public render(transform:Matrix4x4, size:Vector3, color:Color):void {
		let texture:Texture = this.engine.staticGraphics.getDiffuseTexture();

		let colorLocation = this.engine.getShader().getUniformLocation("u_color");
		this.engine.gl.uniform4fv(colorLocation, color.toFloat32Array());

		let modelLocation = this.engine.getShader().getUniformLocation("u_model");
		this.engine.gl.uniformMatrix4fv(modelLocation, false, transform.toFloat32Array());

		texture.activateAndBind(0);
		let diffuseLocation = this.engine.getShader().getUniformLocation("u_diffuse");
		this.engine.gl.uniform1i(diffuseLocation, 0);

		let vertexScaleLocation = this.engine.getShader().getUniformLocation("u_vertexScale");
		this.engine.gl.uniform3f(vertexScaleLocation, size.x, size.y, size.z);

		this.buffer.bind();
		this.buffer.draw();
		this.buffer.unbind();
		texture.unbind();

		this.engine.gl.uniform3f(vertexScaleLocation, 1, 1, 1);
	}
}