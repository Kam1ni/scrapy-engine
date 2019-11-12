import { Color } from "./color";
import { Texture } from "./texture";
import { Engine } from "../engine";

export class Material {
	private name:string;
	public engine:Engine;
	public diffuserColor:Color = Color.white();
	public texture:Texture;

	public constructor(engine:Engine, name:string) {
		this.engine = engine;
		this.name = name;
		this.texture = engine.staticGraphics.getDiffusetTexture();
	}

	public getName():string {
		return this.name;
	}

	public load():void {
		this.texture.load();
	}

	public destroy():void {
		this.texture.destroy();
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