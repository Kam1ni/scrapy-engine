import { SimObject } from "@/engine/world/sim-object";
import * as lampPostTexture from "assets/textures/lamp-post.png";
import { Sprite } from "@/engine/graphics/sprite";
import { Texture } from "@/engine/graphics/texture";

export class LampPost extends SimObject {

	public load():void {
		let lampTexture = new Texture(this.engine, lampPostTexture);
		let lampPostSprite = new Sprite(this.engine, lampTexture);
		
		this.graphics.push(lampPostSprite);
		
		lampPostSprite.load();
		super.load();
	}
}