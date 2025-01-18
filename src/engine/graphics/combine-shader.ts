import vertexSrc from "@/engine/shaders/combine-shaders.vert";
import fragmentSrc from "@/engine/shaders/combine-shaders.frag";
import { Shader } from "./shader";
import { Engine } from "../engine";


export class CombineShader extends Shader{
	public constructor(engine:Engine){
		super(engine, vertexSrc, fragmentSrc, "CombineShader");
	}
}