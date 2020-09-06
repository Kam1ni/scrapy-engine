import { Shader } from "./shader";
import vertexSrc from "@/engine/shaders/mesh.vert";
import fragmentSrc from "@/engine/shaders/mesh.frag";
import { Engine } from "../engine";

export class MeshShader extends Shader{

	public constructor(engine:Engine){
		super(engine, vertexSrc, fragmentSrc, "MeshShader")
	}
}