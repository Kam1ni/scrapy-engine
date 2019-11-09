import { GameWorld } from "@/engine/world/game-world";
import { SimObject } from "@/engine/world/sim-object";
import { Sprite } from "@/engine/graphics/sprite";
import * as woodTexture from "assets/textures/wood.png";
import * as grassTexture from "assets/textures/grass.png";
import { Texture } from "@/engine/graphics/texture";
import { Block } from "./block";
import { Vector3 } from "@/engine/math/vector3";
import { B3N } from "./b3n";

export class World extends GameWorld {
	private woodSprite:Sprite;
	private grassSprite:Sprite;

	private b3n:B3N;

	public load():void {
		this.woodSprite = new Sprite(this.engine, new Texture(this.engine, woodTexture));
		this.grassSprite = new Sprite(this.engine, new Texture(this.engine, grassTexture));
		this.woodSprite.load();
		this.grassSprite.load();

		this.b3n = new B3N(this.engine);
		this.addChild(this.b3n);
		this.b3n.transform.position.y = -16;
		this.b3n.load();

		for (let i = 0; i < 25; i++) {
			if (i > 10 && i < 15) {
				this.addChild(this.createBlock(this.woodSprite, new Vector3(i * 16, 0,0)));
			}else {
				this.addChild(this.createBlock(this.grassSprite, new Vector3(i * 16, 0,0)));
			}
		}
	}

	private createBlock(sprite:Sprite, position:Vector3):SimObject {
		let block = new Block(this.engine, sprite);
		block.transform.position.copyFrom(position);
		return block;
	}
}