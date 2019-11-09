import { SimObject } from "@/engine/world/sim-object";
import * as lampPostLightTexture from "assets/textures/lamp-post-light.png";
import { Texture } from "@/engine/graphics/texture";
import { Sprite } from "@/engine/graphics/sprite";

export class LampPostLight extends SimObject {
	public load():void {
		let lightTexture = new Texture(this.engine, lampPostLightTexture);
		let lampPostLightSprite = new Sprite(this.engine, lightTexture);
		this.graphics.push(lampPostLightSprite);
		lampPostLightSprite.load();
		super.load();
	}
}