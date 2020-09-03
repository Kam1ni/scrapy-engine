import { Asset } from "./asset";
import { Color } from "../graphics/color";
import { GLBuffer, AttributeInfo } from "../graphics/gl-buffer";
import { Engine } from "../engine";
import { Matrix4x4 } from "../math/matrix4x4";
import { Vector3 } from "../math/vector3";
import { Texture } from "./texture";

export class Rect extends Asset{
	private buffer:GLBuffer;

	public constructor(engine:Engine) {
		super(engine, "static-rect");
	}

	public destroy():void {
		if (!this.loaded) return;
		this.buffer.destroy();
	}

	public async load():Promise<void> {
		if (this.loaded) return;
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

		let vertices = [
			0, 0, 0, 0, 1,
			0, 1, 0, 0, 0,
			1, 1, 0, 1, 0,
			1, 1, 0, 1, 0,
			1, 0, 0, 1, 1,
			0, 0, 0, 0, 1
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

	public render(transform:Matrix4x4, width:number, height:number, color:Color, texture:Texture = this.engine.staticGraphics.getDiffuseTexture()):void {
		let colorLocation = this.engine.getShader().getUniformLocation("u_color");
		this.engine.gl.uniform4fv(colorLocation, color.toFloat32Array());

		let transformLocation = this.engine.getShader().getUniformLocation("u_transform");
		this.engine.gl.uniformMatrix4fv(transformLocation, false, transform.toFloat32Array());

		texture.activateAndBind(0);
		let diffuseLocation = this.engine.getShader().getUniformLocation("u_diffuse");
		this.engine.gl.uniform1i(diffuseLocation, 0);

		let normalMap = this.engine.staticGraphics.getNormalMap();
		normalMap.activateAndBind(1);
		let normalMapLocation = this.engine.getShader().getUniformLocation("u_normalMap");
		this.engine.gl.uniform1i(normalMapLocation, 1);

		let vertexScaleLocation = this.engine.getShader().getUniformLocation("u_vertexScale");
		this.engine.gl.uniform3f(vertexScaleLocation, width, height, 1.0);

		this.buffer.bind();
		this.buffer.draw();
		this.buffer.unbind();
		texture.unbind();
		normalMap.unbind();

		this.engine.gl.uniform3f(vertexScaleLocation, 1, 1, 1);
	}
}