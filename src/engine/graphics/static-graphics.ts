import { Engine } from "../engine";
import { Texture } from "./texture";
import { MissingTexture } from "./missing-texture";
import { DiffuseTexture } from "./diffuseTexture";


export class StaticGraphics {
	private engine:Engine;
	private missingTexture:Texture;
	private diffuseTexture:Texture;

	constructor(engine:Engine) {
		this.engine = engine;
		this.missingTexture = new MissingTexture(this.engine);
		this.diffuseTexture = new DiffuseTexture(this.engine);
	}

	public load():void {
		this.missingTexture.load();
		this.diffuseTexture.load();
	}

	public getMissingTexture():Texture {
		return this.missingTexture;
	}

	public getDiffusetTexture():Texture {
		return this.diffuseTexture;
	}

	public destroy():void {
		this.missingTexture.destroy();
		this.diffuseTexture.destroy();
	}
}