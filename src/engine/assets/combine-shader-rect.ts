import { Shader } from "../graphics";
import { PostProcessingRect } from "./post-processing-rect";

export class CombineShaderRect extends PostProcessingRect{

	public get shader(): Shader {
		return this.engine.staticGraphics.getCombineShader();
	}

	public render(diffusedTexture:WebGLTexture, lightingTexture:WebGLTexture){
		let shader = this.shader;
		shader.use();

		this.engine.gl.activeTexture(this.engine.gl.TEXTURE0);
		this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, diffusedTexture);
		this.engine.gl.activeTexture(this.engine.gl.TEXTURE1);
		this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, lightingTexture);

		let diffuseLocation = shader.getUniformLocation("diffuseTexture");
		this.engine.gl.uniform1i(diffuseLocation, 0);
		let lightLocation = shader.getUniformLocation("lightIntensityTexture");
		this.engine.gl.uniform1i(lightLocation, 1);

		this.buffer.bind();
		this.buffer.draw();
		this.buffer.unbind();
	}
}