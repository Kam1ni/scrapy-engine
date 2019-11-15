import { Graphic } from "./graphic";
import { Matrix4x4 } from "../math/matrix4x4";
import { Mesh } from "../assets/mesh";
import { Engine } from "../engine";

export class Object3D extends Graphic{
	protected mesh:Mesh;

	public constructor(engine:Engine, mesh:Mesh) {
		super(engine);
		this.mesh = mesh;
	}

	public render(transform:Matrix4x4): void {
		this.mesh.render(transform);
	}

}