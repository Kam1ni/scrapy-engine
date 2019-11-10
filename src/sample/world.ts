import { GameWorld } from "@/engine/world/game-world";
import { SimObject } from "@/engine/world/sim-object";
import { Sprite } from "@/engine/graphics/sprite";
import * as woodTexture from "assets/textures/wood.png";
import * as grassTexture from "assets/textures/grass.png";
import * as treeTexture from "assets/textures/tree.png";
import { Texture } from "@/engine/graphics/texture";
import { Block } from "./block";
import { Vector3 } from "@/engine/math/vector3";
import { B3N } from "./b3n";
import { LampPost } from "./lamp-post";
import { LampPostLight } from "./lamp-post-light";
import { Keys } from "@/engine/utils/input";

export class World extends GameWorld {
	private woodSprite:Sprite;
	private grassSprite:Sprite;
	private treeSprite:Sprite;

	private b3n:B3N;

	public load():void {
		this.woodSprite = new Sprite(this.engine, new Texture(this.engine, woodTexture));
		this.grassSprite = new Sprite(this.engine, new Texture(this.engine, grassTexture));
		this.treeSprite = new Sprite(this.engine, new Texture(this.engine, treeTexture));
		this.woodSprite.load();
		this.grassSprite.load();
		this.treeSprite.load();

		this.b3n = new B3N(this.engine);
		this.b3n.transform.position.y = 16;
		this.b3n.transform.position.x = 100;
		this.b3n.transform.position.z = 0;
		this.b3n.load();
		this.addChild(this.b3n);
		let lampPost = new LampPost(this.engine);
		lampPost.load();
		this.addChild(lampPost);
		//
		//let lampPostLight = new LampPostLight(this.engine);
		//lampPostLight.transform = lampPost.transform;
		//lampPostLight.load();
		//
		lampPost.transform.position.y = 128;
		lampPost.transform.position.x = 100;
		lampPost.transform.position.z = -5;

		let treeCount = this.randomInt(10,20);
		let lastPos = -10;
		let trees:SimObject[] = [];
		for (let i = 0; i < treeCount; i++) {
			let posDiff = this.randomInt(16, 32);
			lastPos = lastPos + posDiff;

			let tree = this.createBlock(this.treeSprite, new Vector3(lastPos, 128,-10));
			trees.push(tree);
		}
		trees = this.shuffle(trees);
		for (let tree of trees) {
			let flip = this.randomInt(0, 1);
			if (flip) {
				tree.transform.scale.x = -1;
			}
			this.addChild(tree);
		}

		for (let i = 0; i < 25; i++) {
			if (i > 10 && i < 15) {
				this.addChild(this.createBlock(this.woodSprite, new Vector3(i * 16, 0, -10)));
			}else {
				this.addChild(this.createBlock(this.grassSprite, new Vector3(i * 16, 0, -10)));
			}
		}
	
		//this.addChild(lampPostLight);
	}

	public update(dt:number):void {
		let scale = this.engine.getCamera().transform.scale.x;
		let cameraPos = -this.engine.getCamera().transform.position.x / scale;
		let benPos = this.b3n.transform.position.x;
		if (this.b3n.transform.scale.x == -1) {
			benPos -= 16;
		}
		let camWidth = this.engine.getCanvas().width / scale;
		let margin = 100;
		if (margin > camWidth / 2) {
			margin = camWidth / 4;
		}
		if (benPos < cameraPos + margin) {
			this.engine.getCamera().transform.position.x = -(benPos - margin) * scale;
		}
		if (benPos > cameraPos + camWidth - margin) {
			this.engine.getCamera().transform.position.x = -(benPos - camWidth + margin) * scale;
		}

		if (this.engine.input.isKeyPressed(Keys.F12)){
			this.engine.stop();
		}

		super.update(dt);
	}

	private createBlock(sprite:Sprite, position:Vector3):SimObject {
		let block = new Block(this.engine, sprite);
		block.transform.position.copyFrom(position);
		return block;
	}

	private randomInt(min:number, max:number):number {
		let diff = max - min;
		return Math.round(Math.random() * diff + min);
	}

	private shuffle(a:any[]):any[] {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}
}