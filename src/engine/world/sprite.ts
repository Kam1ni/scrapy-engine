import { Texture } from "../assets/texture";
import { Engine } from "../engine";
import { Color } from "../graphics/color";
import { SimObject } from "./sim-object";

export class Sprite extends SimObject {
	protected texture:Texture;

	constructor(engine:Engine, texture:string) {
		super(engine);
		this.texture = this.engine.assetLoaders.textureLoader.getAsset(texture);
	}

	public destroy():void {
		this.engine.assetLoaders.textureLoader.release(this.texture);
		super.destroy();
	}

	public render():void {
		this.engine.staticGraphics.getRect().render(this.worldMatrix, this.texture.getWidth(), this.texture.getHeight(), Color.white(), this.texture);
		super.render();
	}
}