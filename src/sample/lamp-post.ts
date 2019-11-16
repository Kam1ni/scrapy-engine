import { Sprite } from "@/engine/world/sprite";
import { PointLight } from "@/engine/graphics/point-light";
import { Color } from "@/engine/graphics/color";
import { Engine } from "@/engine/engine";

export class LampPost extends Sprite {
	private light:PointLight;

	public constructor(engine:Engine) {
		super(engine, "lamp-post.png");
		this.transform.scale.x = 1;

		this.light = new PointLight(this.engine);
		this.light.transform.position.x = 64;
		this.light.transform.position.y = 64;
		this.light.transform.position.z = 5;
		this.light.color = new Color(255,255,255,30000);
		
		this.pointLights.push(this.light);
		
	}
}