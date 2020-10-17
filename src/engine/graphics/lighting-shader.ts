import { Engine } from "../engine";
import { Shader } from "./shader";
import vertexSrc from "@/engine/shaders/lighting.vert";
import fragmentSrc from "@/engine/shaders/lighting.frag";

export class LightingShader extends Shader{

	public constructor(engine:Engine){
		super(engine, vertexSrc, fragmentSrc, "LightingShader")
	}

}