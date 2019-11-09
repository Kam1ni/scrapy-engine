import { SimObject } from "@/engine/world/sim-object";
import { Sprite } from "@/engine/graphics/sprite";
import { Texture } from "@/engine/graphics/texture";
import * as benTexture from "assets/textures/b3n.png";

export class B3NElement extends SimObject{
	private b3nSprite:Sprite;

	public load():void {
		this.b3nSprite = new Sprite(this.engine, new Texture(this.engine, benTexture));
		this.graphics.push(this.b3nSprite);
		this.b3nSprite.load();
		super.load();
	}

}