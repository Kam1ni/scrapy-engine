import { Engine } from "../engine";
import { Texture } from "./texture";
import { MissingTexture } from "./missing-texture";
import { DiffuseTexture } from "./diffuse-texture";
import { Rect } from "./rect";
import { Box } from "./box";
import { MeshShader } from "../graphics/mesh-shader";
import { SpriteShader } from "../graphics/sprite-shader";
import { Sprite } from "../world";
import { Shader } from "../graphics";


export class StaticAssets {
	private engine:Engine;
	private missingTexture:Texture;
	private diffuseTexture:Texture;
	private rect:Rect;
	private box:Box;

	private meshShader:MeshShader;
	private spriteShader:SpriteShader;

	constructor(engine:Engine) {
		this.engine = engine;
		this.missingTexture = new MissingTexture(this.engine);
		this.diffuseTexture = new DiffuseTexture(this.engine);
		this.box = new Box(engine);
		this.rect = new Rect(engine);

		this.meshShader = new MeshShader(this.engine)
		this.spriteShader = new SpriteShader(this.engine);
	}

	public load():void {
		this.meshShader.load();
		this.spriteShader.load();

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

	public getMeshShader():Shader {
		return this.meshShader;
	}

	public getSpriteShader():Shader {
		return this.spriteShader;
	}

	public getShaders():Shader[] {
		return [this.spriteShader, this.meshShader];
	}

	public destroy():void {
		this.missingTexture.destroy();
		this.diffuseTexture.destroy();
		this.rect.destroy();
		this.box.destroy();
	}
}