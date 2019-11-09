import { SimObject } from "@/engine/world/sim-object";
import { Sprite } from "@/engine/graphics/sprite";
import { Texture } from "@/engine/graphics/texture";
import { B3NElement } from "./b3n-element";
import { Vector3 } from "@/engine/math/vector3";
import { Keys } from "@/engine/utils/input";
import { approach } from "@/engine/math/approach";

export class B3N extends SimObject {
	private b3nObject:SimObject;
	private velocity:Vector3 = new Vector3();

	public load():void {
		this.b3nObject = new B3NElement(this.engine);
		this.addChild(this.b3nObject);
		super.load();
	}

	public update(dt:number):void {
		let speed = 100;
		if (this.engine.input.isKeyPressed(Keys.A)){
			if (this.transform.scale.x == 1){
				this.transform.scale.x = -1;
				this.transform.position.x += 16;
			}
		} else if (this.engine.input.isKeyPressed(Keys.D)){
			if (this.transform.scale.x == -1){
				this.transform.scale.x = 1;
				this.transform.position.x -= 16;
			}
		}

		if (this.engine.input.isKeyDown(Keys.A)) {
			this.velocity.x = approach(this.velocity.x, -speed, dt / 3.0);
		} else if (this.engine.input.isKeyDown(Keys.D)) {
			this.velocity.x = approach(this.velocity.x, speed, dt / 3.0);
		} else{
			this.velocity.x = approach(this.velocity.x, 0, dt / 3.0);
		}

		this.transform.position.x += this.velocity.x * (dt / 1000.0);

		super.update(dt);
	}
}
