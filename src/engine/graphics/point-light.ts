import { Color } from "./color";
import { Transform } from "../math/transform";
import { Engine } from "../engine";
import { Matrix4x4 } from "../math/matrix4x4";

export class PointLight{
	public engine:Engine;
	public color:Color = Color.white();
	public transform:Transform = new Transform();
	public worldTransform:Matrix4x4 = Matrix4x4.identity();

	public constructor(engine:Engine) {
		this.engine = engine;
	}

	render(fragPosTexture:WebGLTexture, normalVectorTexture:WebGLTexture){
		let rect = this.engine.staticGraphics.getLightingRect();

		let location = this.worldTransform.getTranslation();
		let intensity = this.color;

		rect.render(location, intensity, fragPosTexture, normalVectorTexture);
	}
}