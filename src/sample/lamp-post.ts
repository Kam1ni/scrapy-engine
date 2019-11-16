import { SimObject } from "@/engine/world/sim-object";
import { Sprite } from "@/engine/graphics/sprite";
import { Texture } from "@/engine/assets/texture";
import { PointLight } from "@/engine/graphics/point-light";
import { Color } from "@/engine/graphics/color";

export class LampPost extends SimObject {
	private light:PointLight;

	public load():void {
		let lampPostSprite = new Sprite(this.engine, "lamp-post.png");
			
		this.transform.scale.x = 1;

		this.light = new PointLight(this.engine);
		this.light.transform.position.x = 64;
		this.light.transform.position.y = 64;
		this.light.transform.position.z = 5;
		this.light.color = new Color(255,255,255,30000);
		
		this.pointLights.push(this.light);
		
		this.graphics.push(lampPostSprite);
		
		super.load();
	}

	public update(dt:number):void {
		super.update(dt);
	}
}