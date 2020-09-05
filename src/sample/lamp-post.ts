import { Sprite } from "@/engine/world/sprite";
import { PointLight } from "@/engine/graphics/point-light";
import { Color } from "@/engine/graphics/color";
import { Engine } from "@/engine/engine";
import { BoundingBox } from "@/engine/world/bounding-box";
import { Vector3 } from "@/engine/math";

export class LampPost extends Sprite {
	private light:PointLight;
	public boundingBox:BoundingBox;

	public constructor(engine:Engine) {
		super(engine, "lamp-post.png");
		this.transform.scale.x = 1;

		this.light = new PointLight(this.engine);
		this.light.transform.position.x = 64;
		this.light.transform.position.y = 64;
		this.light.transform.position.z = 0;
		this.light.color = new Color(255,255,255,30000);
		
		this.pointLights.push(this.light);

		this.boundingBox = new BoundingBox(this.engine);
		this.boundingBox.size = new Vector3(32, 64, 16);
		this.boundingBox.transform.position.x = 64;
		this.boundingBox.transform.position.y = 32;
		this.addChild(this.boundingBox);
	}

	public update(dt:number){
		this.transform.position.z = Math.sin(new Date().getTime() / 1000) * 100;

		super.update(dt);
	}
}