import { Vector3 } from "@/engine/math/vector3";
import { approach } from "@/engine/math/approach";
import { AnimatedSprite } from "@/engine/world/animated-sprite";
import { Engine } from "@/engine/engine";
import { SimObject } from "@/engine/world/sim-object";
import { BoundingBox } from "@/engine/world/bounding-box";
import { Keys } from "@/main";
import { ScrapyTouch } from "@/engine/utils/scrap-touch";

export class B3N extends SimObject {
	public velocity:Vector3 = new Vector3();
	private idlAnimationTimer = 0;
	private moveAnimationTimer = 0;
	private sprite:AnimatedSprite;
	public boundingBox:BoundingBox;

	public constructor(engine:Engine) {
		super(engine);

		this.sprite = new AnimatedSprite(engine, "b3n-animated.png", 2,2);
		this.sprite.transform.position.x = -8;
		this.addChild(this.sprite);

		let box = new BoundingBox(this.engine);
		box.transform.position.y = 8;
		this.boundingBox = box;
		this.addChild(box);
	}

	public update(dt:number):void {
		// this.transform.rotation.degrees += 0.001 * dt;
		let speed = 100;
		let animationPos = this.sprite.getRenderedLocation();
		let newTouch = this.engine.input.getNewTouches()[0];
		let touch = this.engine.input.getTouches()[0];

		let justIsLeft = this.engine.input.isKeyPressed(Keys.A);
		let justIsRight = this.engine.input.isKeyPressed(Keys.D);
		if (newTouch) {
			justIsLeft = this.isTouchLeft(touch);
			justIsRight = !justIsLeft;
		}

		if (justIsLeft) {
			if (this.transform.scale.x == 1) {
				this.transform.scale.x = -1;
			}
		} else if (justIsRight) {
			if (this.transform.scale.x == -1) {
				this.transform.scale.x = 1;
			}
		}

		let goLeft = this.engine.input.isKeyDown(Keys.ArrowLeft);
		let goRight = this.engine.input.isKeyDown(Keys.ArrowRight);
		if (touch) {
			goLeft = this.isTouchLeft(touch);
			goRight = !goLeft;
		}

		let goUp = this.engine.input.isKeyDown(Keys.ArrowUp);
		let goDown = this.engine.input.isKeyDown(Keys.ArrowDown);
		if (goUp) {
			this.velocity.y = approach(this.velocity.y, speed, dt / 3.0);
		}else if (goDown) {
			this.velocity.y = approach(this.velocity.y, -speed, dt / 3.0);
		}else {
			this.velocity.y = approach(this.velocity.y, 0, dt / 3.0);
		}

		if (goLeft || goRight) {
			if (goLeft) {
				this.velocity.x = approach(this.velocity.x, -speed, dt / 3.0);
			} else if (goRight) {
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
				this.sprite.setRenderedLocation(pos, 1);
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
				this.sprite.setRenderedLocation(pos, 0);
			}
		}


		this.transform.position.x += this.velocity.x * (dt / 1000.0);
		this.transform.position.y += this.velocity.y * (dt / 1000.0);

		super.update(dt);
	}

	private isTouchLeft(touch:ScrapyTouch):boolean {
		return touch.x < this.engine.getCanvas().width / 2;
	}
}
