import { Shader } from "./shader";
import vertexSrc from "@/engine/shaders/line.vert";
import fragmentSrc from "@/engine/shaders/line.frag";
import { Engine } from "../engine";


export class LineShader extends Shader {
	public constructor(engine:Engine) {
		super(engine, vertexSrc, fragmentSrc, "LineShader");
	}

}