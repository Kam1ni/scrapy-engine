import { Engine } from "../engine";
import { GLBuffer, Shader } from "../graphics";
import { GlBufferAttributeInfo } from "../graphics/gl-buffer-attribute-info";
import { Asset } from "./asset";

export abstract class PostProcessingRect extends Asset{
	protected buffer:GLBuffer;

	public constructor(engine:Engine) {
		super(engine, "static-rect");
	}

	public abstract get shader():Shader;

	public destroy():void {
		if (!this.loaded) return;
		this.buffer.destroy();
	}

	public async load():Promise<void> {
		if (this.loaded) return;
		this.buffer = new GLBuffer(this.engine, 3);
		let positionAttribute = this.shader.getAttributeLocation("a_position");
		let info = new GlBufferAttributeInfo();
		info.location = positionAttribute;
		info.size = 3;
		info.offset = 0;
		this.buffer.addAttributeLocation(info);


		let vertices = [
			-1, -1, 0,
			-1, 1, 0,
			1, 1, 0,
			1, 1, 0,
			1, -1, 0,
			-1, -1, 0,
		];

		this.buffer.pushBackData(vertices);
		this.buffer.upload();
		this.buffer.unbind();

		this.loaded = true;
	}


}