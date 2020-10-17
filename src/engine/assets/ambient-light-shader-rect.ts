import { Color, Shader } from "../graphics";
import { PostProcessingRect } from "./post-processing-rect";

export class AmbientLightShaderRect extends PostProcessingRect{

	public get shader(): Shader {
		return this.engine.staticGraphics.getAmbientLightShader();
	}

	public render(color:Color){
		let shader = this.shader;
		shader.use();

		let location = shader.getUniformLocation("ambientLight");
		this.engine.gl.uniform3fv(location, color.toLightFloat32Array());

		this.buffer.bind();
		this.buffer.draw();
		this.buffer.unbind();
	}
}