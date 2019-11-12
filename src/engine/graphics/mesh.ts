import { Graphic } from "./graphic";
import { MeshPart } from "./mesh-part";
import { Engine } from "../engine";
import { Matrix4x4 } from "../math/matrix4x4";

export class Mesh extends Graphic{
	protected meshParts:MeshPart[] = [];

	public constructor(engine:Engine, meshParts:MeshPart[]) {
		super(engine);
		this.meshParts = meshParts;
	}

	public load():void {
		for (let part of this.meshParts) {
			part.load();
		}
	}

	public render(transform:Matrix4x4):void {
		for (let part of this.meshParts) {
			part.render(transform);
		}
	}
}