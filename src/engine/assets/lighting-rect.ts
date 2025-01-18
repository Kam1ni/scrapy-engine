import { Engine } from "../engine";
import { Color, Shader } from "../graphics";
import { Vector3 } from "../math";
import { PostProcessingRect } from "./post-processing-rect";

export class LightingRect extends PostProcessingRect {
	public constructor(engine:Engine){
		super(engine);
	}

	public get shader():Shader{
		return this.engine.staticGraphics.getLightingShader();
	}

	public render(position:Vector3, intensity:Color, fragPosTexture:WebGLTexture, normalVectorTexture:WebGLTexture):void {
		let shader = this.shader;
		shader.use();
		let pointLightPosition = shader.getUniformLocation("u_point_light_position");
		this.engine.gl.uniform3fv(pointLightPosition, position.toFloat32Array());
		let pointLightIntensity = shader.getUniformLocation("u_point_light_intensity");
		this.engine.gl.uniform4fv(pointLightIntensity, intensity.toFloat32Array());

		this.engine.gl.activeTexture(this.engine.gl.TEXTURE0);
		this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, fragPosTexture);
		let fragPosLocation = shader.getUniformLocation("u_frag_pos");
		this.engine.gl.uniform1i(fragPosLocation, 0);

		this.engine.gl.activeTexture(this.engine.gl.TEXTURE1);
		this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, normalVectorTexture);
		let normalVectorLocation = shader.getUniformLocation("u_normal_vector");
		this.engine.gl.uniform1i(normalVectorLocation, 1);


		this.buffer.bind();
		this.buffer.draw();
		this.buffer.unbind();
	}
}