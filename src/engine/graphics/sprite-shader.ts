import { Shader } from "./shader";
import vertexSrc from "@/engine/shaders/sprite.vert";
import fragmentSrc from "@/engine/shaders/sprite.frag";
import { Engine } from "../engine";


export class SpriteShader extends Shader {
	public constructor(engine:Engine){
		super(engine, vertexSrc, fragmentSrc, "SpriteShader")
	}
}