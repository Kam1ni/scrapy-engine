import { Engine } from "../engine";
import { GLBuffer, AttributeInfo } from "../graphics/gl-buffer";
import { Asset } from "./asset";
import { Color } from "../graphics/color";
import { Matrix4x4 } from "../math/matrix4x4";
import { Material } from "./material";
import { Shader } from "../graphics";

export class MeshPart extends Asset {
	protected buffer:GLBuffer;
	protected vertices:number[];
	public material:Material;

	public constructor(engine:Engine, vertices:number[], materialName:string) {
		super(engine, "mesh-part");
		this.vertices = vertices;
		this.material = this.engine.assetLoaders.materialLoader.getAsset(materialName);
	}

	public getShader():Shader {
		return this.engine.staticGraphics.getMeshShader();
	}

	public async load():Promise<void> {
		if (this.loaded) {
			return;
		}
		let shader = this.getShader();

		this.buffer = new GLBuffer(this.engine, 8);
		this.buffer.bind();

		let positionAttribute = shader.getAttributeLocation("a_position");
		let info = new AttributeInfo();
		info.location = positionAttribute;
		info.size = 3;
		info.offset = 0;
		this.buffer.addAttributeLocation(info);

		let textCoordAttribute = shader.getAttributeLocation("a_texCoord");
		info = new AttributeInfo();
		info.location = textCoordAttribute;
		info.size = 2;
		info.offset = 3;
		this.buffer.addAttributeLocation(info);

		let normalAttribute = shader.getAttributeLocation("a_normalVector");
		info = new AttributeInfo();
		info.location = normalAttribute;
		info.size = 3;
		info.offset = 5;
		this.buffer.addAttributeLocation(info);

		this.buffer.setData(this.vertices);
		this.buffer.upload();
		this.buffer.unbind();

		let gl = this.engine.gl;
		this.engine.staticGraphics.getDiffuseTexture().bind();
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1,1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255,255,255,255]));
		this.engine.staticGraphics.getDiffuseTexture().unbind();

		this.material.load();
		this.loaded = true;
	}

	public destroy():void {
		this.buffer.destroy();
		this.engine.assetLoaders.materialLoader.release(this.material);
	}

	public render(transform:Matrix4x4):void {
		let shader = this.getShader();
		shader.use();

		let modelLocation = shader.getUniformLocation("u_model");
		this.engine.gl.uniformMatrix4fv(modelLocation, false, transform.toFloat32Array());

		this.material.bind(shader);

		this.buffer.bind();
		this.buffer.draw();
		this.buffer.unbind();
		this.material.unbind();
	}

}