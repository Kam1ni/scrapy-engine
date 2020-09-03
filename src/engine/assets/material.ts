import { Color } from "../graphics/color";
import { Texture } from "./texture";
import { Engine } from "../engine";
import { Asset } from "./asset";

export class Material extends Asset {
	public diffuserColor:Color = Color.white();
	public texture:Texture;
	public normalMap:Texture;

	public constructor(engine:Engine, name:string) {
		super(engine, name);
		this.texture = engine.staticGraphics.getDiffuseTexture();
		this.normalMap = engine.staticGraphics.getNormalMap();
	}

	public async load():Promise<void> {
		if (this.loaded) {
			return;
		}
		this.texture.load();
		this.normalMap.load();
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
	
	private destroyNormalMap(){
		if (this.normalMap == this.engine.staticGraphics.getNormalMap()){
			return;
		}
		this.normalMap.destroy();
	}

	public destroy():void {
		this.destroyTexture();
		this.destroyNormalMap();
	}

	public bind():void {
		let colorLocation = this.engine.getShader().getUniformLocation("u_color");
		this.engine.gl.uniform4fv(colorLocation, this.diffuserColor.toFloat32Array());

		this.texture.activateAndBind(0);
		let diffuseLocation = this.engine.getShader().getUniformLocation("u_diffuse");
		this.engine.gl.uniform1i(diffuseLocation, 0);

		this.normalMap.activateAndBind(1);
		let normalMapLocation = this.engine.getShader().getUniformLocation("u_normalMap");
		this.engine.gl.uniform1i(normalMapLocation, 1);
	}

	public unbind():void {
		this.texture.unbind();
		this.normalMap.unbind();
	}
}