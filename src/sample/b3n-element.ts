import { SimObject } from "@/engine/world/sim-object";
import { Texture } from "@/engine/assets/texture";
import { AnimatedSprite } from "@/engine/graphics/animated-sprite";
import { Vector3 } from "@/engine/math/vector3";

export class B3NElement extends SimObject{
	public b3nSprite:AnimatedSprite;
	public origin:Vector3 = new Vector3(-8.0,0.0, 0.0);

	public load():void {
		this.b3nSprite = new AnimatedSprite(this.engine, "b3n-animated.png", 2, 2);
		this.graphics.push(this.b3nSprite);
		super.load();
	}

}