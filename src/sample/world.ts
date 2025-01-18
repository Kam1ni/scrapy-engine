import { SimObject } from "@/engine/world/sim-object";
import { Sprite } from "@/engine/world/sprite";
import { Vector3 } from "@/engine/math/vector3";
import { B3N } from "./b3n";
import { LampPost } from "./lamp-post";
import { Color } from "@/engine/graphics/color";
import { PerspectiveCamera } from "@/engine/world/perspective-camera";
import { Engine } from "@/engine/engine";
import { Audio } from "@/engine/assets/audio";
import { Cube } from "./cube";
import { BaseWorld } from "./base-world";
import { Keys } from "@/main";

export class World extends BaseWorld {
	private b3n:B3N;
	private lampPost:LampPost;
	private audio:Audio;

	public constructor(engine:Engine) {
		super(engine);
		this.ambientLight = new Color(100, 100, 100, 0);
		this.b3n = new B3N(this.engine);
		this.b3n.transform.position.y = 0;
		this.b3n.transform.position.x = 100;
		this.b3n.transform.position.z = 0;
		this.addChild(this.b3n);

		let lampPost = new LampPost(this.engine);
		this.addChild(lampPost);
		lampPost.transform.position.y = 0;
		lampPost.transform.position.x = 100;
		lampPost.transform.position.z = -5;
		this.lampPost = lampPost;


		let treeCount = this.randomInt(10,20);
		let lastPos = -10;
		let trees:SimObject[] = [];
		for (let i = 0; i < treeCount; i++) {
			let posDiff = this.randomInt(16, 32);
			lastPos = lastPos + posDiff;

			let tree = this.createBlock("tree.png", new Vector3(lastPos, 0,-10));
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
				this.addChild(this.createBlock("wood.png", new Vector3(i * 16, -16, -10)));
			}else {
				this.addChild(this.createBlock("grass.png", new Vector3(i * 16, -16, -10)));
			}
		}

		let matTest = new Cube(this.engine);
		matTest.transform.position.x = 120;
		matTest.transform.position.y = 80;
		this.addChild(matTest);
		this.audio = this.engine.assetLoaders.audioLoader.getAsset("test-audio.wav");
	}

	public update(dt:number):void {

		if (this.engine.input.isKeyPressed(Keys.P)) {
			this.audio.play();
		}

		if (this.engine.input.getMouseScroll()) {
			let cam = this.getCamera() as PerspectiveCamera;
			cam.fovDeg += (this.engine.input.getMouseScroll()/10);
			if (cam.fovDeg > 170) {
				cam.fovDeg = 170;
			}
			if (cam.fovDeg < 10) {
				cam.fovDeg = 10;
			}
			cam.updateMatrix();
		}

		if (this.engine.input.isKeyReleased(Keys.F1)) {
			this.engine.renderBoundingBoxes = !this.engine.renderBoundingBoxes;
		}

		super.update(dt);

		let touchPos = this.b3n.boundingBox.isTouching(this.lampPost.boundingBox);
		if (touchPos) {
			this.b3n.boundingBox.color = Color.red();
			this.lampPost.boundingBox.color = Color.red();
			if (Math.abs(touchPos.x) > Math.abs(touchPos.y)) {
				this.b3n.transform.position.y -= touchPos.y;
			}else {
				this.b3n.transform.position.x -= touchPos.x;
			}
			this.b3n.velocity.x = 0;
			this.b3n.updateMatrices();
		}else {
			this.b3n.boundingBox.color = Color.white();
			this.lampPost.boundingBox.color = Color.white();
		}

	}

	private createBlock(textureName:string, position:Vector3):Sprite {
		let block = new Sprite(this.engine, textureName);
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