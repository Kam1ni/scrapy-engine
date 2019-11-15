import { Engine } from "../engine";
import { GLBuffer, AttributeInfo } from "../graphics/gl-buffer";
import { Asset } from "./asset";
import { Color } from "../graphics/color";
import { Matrix4x4 } from "../math/matrix4x4";
import { Material } from "./material";

export class MeshPart extends Asset {
	protected buffer:GLBuffer;
	protected vertices:number[];
	public material:Material;

	public constructor(engine:Engine, vertices:number[], material:Material) {
		super(engine);
		this.vertices = vertices;
		this.material = material;
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
		this.engine.staticGraphics.getDiffuseTexture().bind();
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1,1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255,255,255,255]));
		this.engine.staticGraphics.getDiffuseTexture().unbind();
		this.material.load();
	}

	public destroy():void {
		this.buffer.destroy();
	}

	public render(transform:Matrix4x4):void {
		this.material.bind();

		let transformLocation = this.engine.getShader().getUniformLocation("u_transform");
		this.engine.gl.uniformMatrix4fv(transformLocation, false, transform.toFloat32Array());

		this.buffer.bind();
		this.buffer.draw();
		this.buffer.unbind();
		this.material.unbind();
	}

}