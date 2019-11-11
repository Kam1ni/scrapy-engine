import { Color } from "./color";
import { Vector3 } from "../math/vector3";
import { Transform } from "../math/transform";
import { GameContainer } from "../world/game-container";
import { Engine } from "../engine";
import { Matrix4x4 } from "../math/matrix4x4";
import { Vector4 } from "../math/vector4";

export class PointLight{
	public engine:Engine;
	public color:Color = Color.white();
	public transform:Transform = new Transform();
	public worldTransform:Matrix4x4 = Matrix4x4.identity();

	public constructor(engine:Engine) {
		this.engine = engine;
	}
}