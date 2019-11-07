import { Engine } from "@/engine/engine";

export abstract class Shader {
	private engine:Engine;
	private vertexShader:WebGLShader;
	private fragmentShader:WebGLShader;

	public constructor(engine:Engine) {
		this.engine = engine;
	}

	public abstract get vertexSrc():string;
	public abstract get fragmentSrc():string;
	public abstract get name():string;


	protected compileShader(shaderSrc:string, shaderType:number):WebGLShader {
		let shader = this.engine.gl.createShader(shaderType);
		this.engine.gl.shaderSource(shader, shaderSrc);
		this.engine.gl.compileShader(shader);

		let success = this.engine.gl.getShaderParameter(shader, this.engine.gl.COMPILE_STATUS);
		if (!success) {
			throw new Error(`Shader ${this.name} failed to compile: ${this.engine.gl.getShaderInfoLog(shader)}`);
		}

		return shader;
	}

	public load():void {
		
	}
}