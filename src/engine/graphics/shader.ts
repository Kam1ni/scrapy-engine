import { Engine } from "@/engine/engine";

export class Shader {
	protected engine:Engine;
	private vertexShader:WebGLShader;
	private fragmentShader:WebGLShader;
	private program:WebGLProgram;
	private loaded:boolean;
	private atributes:{[name:string]:number} = {};
	private uniforms:{[name:string]:WebGLUniformLocation} = {};

	private _vertexSrc:string;
	private _fragmentSrc:string;
	private _name:string;

	public constructor(engine:Engine, vertexSrc:string = "", fragmentSrc:string = "", name:string) {
		this.engine = engine;
		this._vertexSrc = vertexSrc;
		this._fragmentSrc = fragmentSrc;
		this._name = name;
	}

	public get vertexSrc():string{
		return this._vertexSrc;
	};
	public get fragmentSrc():string{
		return this._fragmentSrc;
	};
	public get name():string {
		return this._name;
	};

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

	public use():void {
		this.engine.gl.useProgram(this.program);
	}

	public destroy():void {
		// TODO: IMPLEMENT DESTROY
		console.error("DESTROY NOT IMPLEMENTED YET");
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

	public getAttributeLocation(name:string):number {
		return this.atributes[name];
	}

	public getUniformLocation(name:string):WebGLUniformLocation {
		return this.uniforms[name];
	}

	public getIsloaded(){
		return this.loaded;
	}
}