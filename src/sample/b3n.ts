import { SimObject } from "@/engine/world/sim-object";
import { Sprite } from "@/engine/graphics/sprite";
import { Texture } from "@/engine/graphics/texture";
import { B3NElement } from "./b3n-element";
import { Vector3 } from "@/engine/math/vector3";
import { Keys } from "@/engine/utils/input";
import { approach } from "@/engine/math/approach";

export class B3N extends SimObject {
	private b3nObject:B3NElement;
	private velocity:Vector3 = new Vector3();
	private idlAnimationTimer = 0;
	private moveAnimationTimer = 0;

	public load():void {
		this.b3nObject = new B3NElement(this.engine);
		this.addChild(this.b3nObject);
		super.load();
	}

	public update(dt:number):void {
		let speed = 100;
		let animationPos = this.b3nObject.b3nSprite.getRenderedLocation();
		
		if (this.engine.input.isKeyPressed(Keys.A)) {
			if (this.transform.scale.x == 1) {
				this.transform.scale.x = -1;
				this.transform.position.x += 16;
			}
		} else if (this.engine.input.isKeyPressed(Keys.D)) {
			if (this.transform.scale.x == -1) {
				this.transform.scale.x = 1;
				this.transform.position.x -= 16;
			}
		}
		
		if (this.engine.input.isKeyDown(Keys.A) || this.engine.input.isKeyDown(Keys.D)) {
			if (this.engine.input.isKeyDown(Keys.A)) {
				this.velocity.x = approach(this.velocity.x, -speed, dt / 3.0);
			} else if (this.engine.input.isKeyDown(Keys.D)) {
				this.velocity.x = approach(this.velocity.x, speed, dt / 3.0);
			}
			this.moveAnimationTimer+=dt;
			if (this.moveAnimationTimer > 50) {
				this.moveAnimationTimer -= 50;
				let pos = animationPos.x;
				if (pos == 1) {
					pos = 0;
				}else {
					pos = 1;
				}
				this.b3nObject.b3nSprite.setRenderedLocation(pos, 1);
			}

		} else {
			this.idlAnimationTimer+=dt;
			this.velocity.x = approach(this.velocity.x, 0, dt / 3.0);
			if (this.idlAnimationTimer > 500) {
				this.idlAnimationTimer-=500;
				let pos = animationPos.x;
				if (pos == 1) {
					pos = 0;
				}else {
					pos = 1;
				}
				this.b3nObject.b3nSprite.setRenderedLocation(pos, 0);

			}
		}

		this.transform.position.x += this.velocity.x * (dt / 1000.0);

		super.update(dt);
	}
}
