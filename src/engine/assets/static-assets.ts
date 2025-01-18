import { Engine } from "../engine";
import { Texture } from "./texture";
import { MissingTexture } from "./missing-texture";
import { DiffuseTexture } from "./diffuse-texture";
import { Rect } from "./rect";
import { Box } from "./box";
import { MeshShader } from "../graphics/mesh-shader";
import { SpriteShader } from "../graphics/sprite-shader";
import { Shader } from "../graphics";
import { LightingShader } from "../graphics/lighting-shader";
import { LightingRect } from "./lighting-rect";
import { CombineShader } from "../graphics/combine-shader";
import { CombineShaderRect } from "./combine-shader-rect";
import { AmbientLightShader } from "../graphics/ambient-light-shader";
import { AmbientLightShaderRect } from "./ambient-light-shader-rect";
import { LineShader } from "../graphics/line-shader";
import { Line } from "./line";


export class StaticAssets {
	private engine:Engine;
	private missingTexture:Texture;
	private diffuseTexture:Texture;
	private lightingRect:LightingRect;
	private ambientLightRect:AmbientLightShaderRect;
	private combineShaderRect:CombineShaderRect;
	private rect:Rect;
	private box:Box;
	private line:Line;

	private meshShader:MeshShader;
	private spriteShader:SpriteShader;
	private lightingShader:LightingShader;
	private ambientLightShader:AmbientLightShader;
	private combineShader:CombineShader;
	private lineShader:LineShader;

	constructor(engine:Engine) {
		this.engine = engine;
		this.meshShader = new MeshShader(this.engine);
		this.spriteShader = new SpriteShader(this.engine);
		this.lightingShader = new LightingShader(this.engine);
		this.ambientLightRect = new AmbientLightShaderRect(this.engine);
		this.combineShader = new CombineShader(this.engine);
		this.lineShader = new LineShader(this.engine);

		this.missingTexture = new MissingTexture(this.engine);
		this.diffuseTexture = new DiffuseTexture(this.engine);
		this.lightingRect = new LightingRect(this.engine);
		this.combineShaderRect = new CombineShaderRect(this.engine);
		this.ambientLightShader = new AmbientLightShader(this.engine);
		this.box = new Box(engine);
		this.rect = new Rect(engine);
		this.line = new Line(engine);

	}

	public load():void {
		this.meshShader.load();
		this.spriteShader.load();
		this.lightingShader.load();
		this.ambientLightShader.load();
		this.combineShader.load();
		this.lineShader.load();

		this.missingTexture.load();
		this.diffuseTexture.load();
		this.lightingRect.load();
		this.ambientLightRect.load();
		this.combineShaderRect.load();
		this.rect.load();
		this.box.load();
		this.line.load();
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

	public getLine():Line {
		return this.line;
	}

	public getLightingRect():LightingRect{
		return this.lightingRect;
	}

	public getAmbientLightRect():AmbientLightShaderRect{
		return this.ambientLightRect;
	}

	public getCombineShaderRect():CombineShaderRect{
		return this.combineShaderRect;
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

	public getLightingShader():Shader{
		return this.lightingShader;
	}

	public getAmbientLightShader():Shader{
		return this.ambientLightShader;
	}

	public getCombineShader():Shader{
		return this.combineShader;
	}

	public getLineShader():Shader {
		return this.lineShader;
	}

	public getShaders():Shader[] {
		return [this.spriteShader, this.meshShader, this.lineShader];
	}

	public destroy():void {
		this.missingTexture.destroy();
		this.diffuseTexture.destroy();
		this.rect.destroy();
		this.box.destroy();
	}
}