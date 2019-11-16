import { Asset } from "../assets/asset";
import { Texture } from "../assets/texture";
import { Engine } from "../engine";
import { GLBuffer, AttributeInfo } from "./gl-buffer";
import { Matrix4x4 } from "../math/matrix4x4";
import { Color } from "./color";
import { Graphic } from "./graphic";

export class Sprite extends Graphic {
	protected texture:Texture;

	constructor(engine:Engine, texture:string) {
		super(engine);
		this.texture = this.engine.assetLoaders.textureLoader.getAsset(texture);
	}

	public destroy():void {
		this.engine.assetLoaders.textureLoader.release(this.texture);
	}

	public render(transform:Matrix4x4):void {
		this.engine.staticGraphics.getRect().render(transform, this.texture.getWidth(), this.texture.getHeight(), Color.white(), this.texture);
	}
}