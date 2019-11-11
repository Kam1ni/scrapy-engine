import { SimObject } from "@/engine/world/sim-object";
import * as lampPostTexture from "assets/textures/lamp-post.png";
import { Sprite } from "@/engine/graphics/sprite";
import { Texture } from "@/engine/graphics/texture";
import { PointLight } from "@/engine/graphics/point-light";
import { Color } from "@/engine/graphics/color";
import { Matrix4x4 } from "@/engine/math/matrix4x4";
import { Vector3 } from "@/engine/math/vector3";
import { Transform } from "@/engine/math/transform";

export class LampPost extends SimObject {
	private light:PointLight;

	public load():void {
		let lampTexture = new Texture(this.engine, lampPostTexture);
		let lampPostSprite = new Sprite(this.engine, lampTexture);
			
		this.transform.scale.x = 1;

		this.light = new PointLight(this.engine);
		this.light.transform.position.x = 64;
		this.light.transform.position.y = -64;
		this.light.color = new Color(255,255,255,30000);
		
		this.pointLights.push(this.light);
		
		this.graphics.push(lampPostSprite);
		
		lampPostSprite.load();
		super.load();
	}

	public update(dt:number):void {
		super.update(dt);
	}
}