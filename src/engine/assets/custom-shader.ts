import { Shader } from "../graphics";
import { Engine } from "../engine";
import { Asset } from "./asset";

export class ShaderAsset extends Asset {
	private shader: Shader;
	
	public constructor(engine: Engine, vertexSrc: string, fragmentSrc: string, name: string) {
		super(engine, name);
		this.shader = new Shader(engine, vertexSrc, fragmentSrc, name);
	}

	public load(){
		this.shader.load();
	}
	
	public getShader():Shader{
		return this.shader;
	}

	public isLoaded():boolean {
		return this.shader.getIsloaded();
	}

	public destroy(){
		this.shader.destroy();
	}
}
