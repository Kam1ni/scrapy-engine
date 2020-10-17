import { Shader } from "./shader";
import vertexSrc from "@/engine/shaders/ambient-light.vert";
import fragmentSrc from "@/engine/shaders/ambient-light.frag";
import { Engine } from "../engine";

export class AmbientLightShader extends Shader{
	public constructor(engine:Engine){
		super(engine, vertexSrc, fragmentSrc, "AmbientLightShader")
	}
}