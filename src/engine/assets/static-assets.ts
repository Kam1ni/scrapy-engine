import { Engine } from "../engine";
import { Texture } from "./texture";
import { MissingTexture } from "./missing-texture";
import { DiffuseTexture } from "./diffuse-texture";
import { Rect } from "./rect";
import { Box } from "./box";


export class StaticAssets {
	private engine:Engine;
	private missingTexture:Texture;
	private diffuseTexture:Texture;
	private rect:Rect;
	private box:Box;

	constructor(engine:Engine) {
		this.engine = engine;
		this.missingTexture = new MissingTexture(this.engine);
		this.diffuseTexture = new DiffuseTexture(this.engine);
		this.box = new Box(engine);
		this.rect = new Rect(engine);
	}

	public load():void {
		this.missingTexture.load();
		this.diffuseTexture.load();
		this.rect.load();
		this.box.load();
	}

	public getMissingTexture():Texture {
		return this.missingTexture;
	}

	public getDiffuseTexture():Texture {
		return this.diffuseTexture;
	}

	public getRect():Rect {
		return this.rect;
	}

	public getBox():Box {
		return this.box;
	}

	public destroy():void {
		this.missingTexture.destroy();
		this.diffuseTexture.destroy();
		this.rect.destroy();
		this.box.destroy();
	}
}