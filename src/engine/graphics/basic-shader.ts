import { Shader } from "./shader";
import vertexSrc from "@/engine/shaders/vertex.glsl";
import fragmentSrc from "@/engine/shaders/fragment.glsl";

export class BasicShader extends Shader{
	public get vertexSrc(): string {
		return vertexSrc;
	}
	public get fragmentSrc(): string {
		return fragmentSrc;
	}
	public get name(): string {
		return "BasicShader";
	}
}