import { Color } from "../graphics/color";
import { Texture } from "./texture";
import { Engine } from "../engine";
import { Asset } from "./asset";

export class Material extends Asset {
	public diffuserColor:Color = Color.white();
	public texture:Texture;

	public constructor(engine:Engine, name:string) {
		super(engine, name);
		this.texture = engine.staticGraphics.getDiffuseTexture();
	}

	public async load():Promise<void> {
		if (this.loaded) {
			return;
		}
		this.texture.load();
		this.loaded = true;
	}

	private destroyTexture(){
		if (this.texture == this.engine.staticGraphics.getDiffuseTexture()) {
			return;
		}
		if (this.texture == this.engine.staticGraphics.getMissingTexture()) {
			return;
		}
		this.texture.destroy();
	}
	
	public destroy():void {
		this.destroyTexture();
	}

	public bind():void {
		let colorLocation = this.engine.getShader().getUniformLocation("u_color");
		this.engine.gl.uniform4fv(colorLocation, this.diffuserColor.toFloat32Array());

		this.texture.activateAndBind(0);
		let diffuseLocation = this.engine.getShader().getUniformLocation("u_diffuse");
		this.engine.gl.uniform1i(diffuseLocation, 0);

	}

	public unbind():void {
		this.texture.unbind();
	}
}