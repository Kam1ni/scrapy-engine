import { Engine } from "../engine";
import { Color, GLBuffer, Shader } from "../graphics";
import { AttributeInfo } from "../graphics/gl-buffer";
import { Matrix4x4, Vector3 } from "../math";
import { Asset } from "./asset";

export class Line extends Asset {
	protected buffer:GLBuffer;

	public constructor(engine:Engine) {
		super(engine, "line");
	}

	public getShader():Shader {
		return this.engine.staticGraphics.getLineShader();
	}

	public async load():Promise<void> {
		if (this.loaded) return;
		let gl = this.engine.gl;
		let shader = this.getShader();

		this.buffer = new GLBuffer(this.engine, 3, gl.FLOAT, gl.ARRAY_BUFFER, gl.LINES);
		let positionAttribute = shader.getAttributeLocation("a_position");
		let info = new AttributeInfo();
		info.location = positionAttribute;
		info.size = 3;
		info.offset = 0;
		this.buffer.addAttributeLocation(info);

		let vertices = [
			0,0,0,
			1,1,1
		];

		this.buffer.pushBackData(vertices);
		this.buffer.upload();
		this.buffer.unbind();
		this.loaded = true;
	}

	public destroy(): void {
		this.buffer.destroy();
	}

	public render(pos1:Vector3, pos2:Vector3, color:Color){
		let shader = this.getShader();
		shader.use();
		let transform = Matrix4x4.translation(pos1).scale(pos2);

		let colorLocation = shader.getUniformLocation("u_color");
		this.engine.gl.uniform4fv(colorLocation, color.toFloat32Array());

		let modelLocation = shader.getUniformLocation("u_model");
		this.engine.gl.uniformMatrix4fv(modelLocation, false, transform.toFloat32Array());

		this.buffer.bind();
		this.buffer.draw();
		this.buffer.unbind();
	}
}