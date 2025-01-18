import { Asset } from "./asset";
import { Color } from "../graphics/color";
import { GLBuffer } from "../graphics/gl-buffer";
import { Engine } from "../engine";
import { Matrix4x4 } from "../math/matrix4x4";
import { Texture } from "./texture";
import { Shader } from "../graphics";
import { Vector2 } from "../math";
import { GlBufferAttributeInfo } from "../graphics/gl-buffer-attribute-info";

export class Rect extends Asset{
	private buffer:GLBuffer;

	public constructor(engine:Engine) {
		super(engine, "static-rect");
	}

	public destroy():void {
		if (!this.loaded) return;
		this.buffer.destroy();
	}

	public getShader():Shader {
		return this.engine.staticGraphics.getSpriteShader();
	}

	public async load():Promise<void> {
		if (this.loaded) return;
		let shader = this.getShader();
		this.buffer = new GLBuffer(this.engine, 5);
		let positionAttribute = shader.getAttributeLocation("a_position");
		let info = new GlBufferAttributeInfo();
		info.location = positionAttribute;
		info.size = 3;
		info.offset = 0;
		this.buffer.addAttributeLocation(info);

		let textCoordAttribute = shader.getAttributeLocation("a_texCoord");
		info = new GlBufferAttributeInfo();
		info.location = textCoordAttribute;
		info.size = 2;
		info.offset = 3;
		this.buffer.addAttributeLocation(info);


		let vertices = [
			0, 0, 0, 0, 1,
			0, 1, 0, 0, 0,
			1, 1, 0, 1, 0,
			1, 1, 0, 1, 0,
			1, 0, 0, 1, 1,
			0, 0, 0, 0, 1,
		];

		let gl = this.engine.gl;
		this.buffer.pushBackData(vertices);
		this.buffer.upload();
		this.buffer.unbind();

		this.engine.staticGraphics.getDiffuseTexture().bind();
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1,1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255,255,255,255]));
		this.engine.staticGraphics.getDiffuseTexture().unbind();

		this.loaded = true;
	}

	public render(transform:Matrix4x4, width:number, height:number, color:Color, texture:Texture = this.engine.staticGraphics.getDiffuseTexture(), uvOffset:Vector2 = Vector2.zero(), uvSize:Vector2 = Vector2.one()):void {
		let shader = this.getShader();
		shader.use();
		let uvOffsetLocation = shader.getUniformLocation("u_uvOffset");
		this.engine.gl.uniform2fv(uvOffsetLocation, uvOffset.toFloat32Array());
		let uvSizeLocation = shader.getUniformLocation("u_uvSize");
		this.engine.gl.uniform2fv(uvSizeLocation, uvSize.toFloat32Array());

		let colorLocation = shader.getUniformLocation("u_color");
		this.engine.gl.uniform4fv(colorLocation, color.toFloat32Array());

		let modelLocation = shader.getUniformLocation("u_model");
		this.engine.gl.uniformMatrix4fv(modelLocation, false, transform.toFloat32Array());

		texture.activateAndBind(0);
		let diffuseLocation = shader.getUniformLocation("u_diffuse");
		this.engine.gl.uniform1i(diffuseLocation, 0);

		let vertexScaleLocation = shader.getUniformLocation("u_vertexScale");
		this.engine.gl.uniform3f(vertexScaleLocation, width, height, 1.0);

		this.buffer.bind();
		this.buffer.draw();
		this.buffer.unbind();
		texture.unbind();

		this.engine.gl.uniform3f(vertexScaleLocation, 1, 1, 1);
		this.engine.gl.uniform2fv(uvOffsetLocation, new Float32Array([0.0,0.0]));
		this.engine.gl.uniform2fv(uvSizeLocation, new Float32Array([1.0,1.0]));
	}
}