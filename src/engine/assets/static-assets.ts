import { Engine } from "../engine";
import { Texture } from "./texture";
import { MissingTexture } from "./missing-texture";
import { DiffuseTexture } from "./diffuse-texture";
import { Rect } from "./rect";


export class StaticAssets {
	private engine:Engine;
	private missingTexture:Texture;
	private diffuseTexture:Texture;
	private rect:Rect;

	constructor(engine:Engine) {
		this.engine = engine;
		this.missingTexture = new MissingTexture(this.engine);
		this.diffuseTexture = new DiffuseTexture(this.engine);
		this.rect = new Rect(engine);
	}

	public load():void {
		this.missingTexture.load();
		this.diffuseTexture.load();
		this.rect.load();
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

	public destroy():void {
		this.missingTexture.destroy();
		this.diffuseTexture.destroy();
		this.rect.destroy();
	}
}