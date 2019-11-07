import { Engine } from "@/engine/engine";

export abstract class Shader {
	protected engine:Engine;
	private vertexShader:WebGLShader;
	private fragmentShader:WebGLShader;
	private program:WebGLProgram;
	private loaded:boolean;
	private atributes:{[name:string]:number} = {};
	private uniforms:{[name:string]:WebGLUniformLocation} = {};

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
			throw new Error(`Shader ${this.name} failed to compile:\n ${this.engine.gl.getShaderInfoLog(shader)}`);
		}

		return shader;
	}

	public load():void {
		if (this.loaded) {
			console.warn(`Attempting to load already loaded shader ${this.name}`);
			return;
		}
		this.vertexShader = this.compileShader(this.vertexSrc, this.engine.gl.VERTEX_SHADER);
		this.fragmentShader = this.compileShader(this.fragmentSrc, this.engine.gl.FRAGMENT_SHADER);

		this.program = this.engine.gl.createProgram();
		this.engine.gl.attachShader(this.program, this.vertexShader);
		this.engine.gl.attachShader(this.program, this.fragmentShader);
		this.engine.gl.linkProgram(this.program);

		let success = this.engine.gl.getProgramParameter(this.program, this.engine.gl.LINK_STATUS);
		if (!success) {
			throw new Error(`Program ${this.name} failed to link:\n ${this.engine.gl.getProgramInfoLog(this.program)}`);
		}
		this.loaded = true;

		this.detectAttributes();
		this.detectUniforms();
	}
	
	private detectAttributes():void {
		let attribCount = this.engine.gl.getProgramParameter(this.program, this.engine.gl.ACTIVE_ATTRIBUTES);
		for (let i = 0; i < attribCount; i++) {
			let info = this.engine.gl.getActiveAttrib(this.program, i);
			this.atributes[info.name] = this.engine.gl.getAttribLocation(this.program, info.name);
		}
	}

	private detectUniforms():void {
		let uniformCount = this.engine.gl.getProgramParameter(this.program, this.engine.gl.ACTIVE_UNIFORMS);
		for (let i = 0; i < uniformCount; i++) {
			let info = this.engine.gl.getActiveUniform(this.program, i);
			this.uniforms[info.name] = this.engine.gl.getUniformLocation(this.program, info.name);
		}
	}
}