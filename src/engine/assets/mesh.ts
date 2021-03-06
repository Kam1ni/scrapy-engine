import { Asset } from "./asset";
import { MeshPart } from "./mesh-part";
import { Engine } from "../engine";
import { Matrix4x4 } from "../math/matrix4x4";

export class Mesh extends Asset{
	protected meshParts:MeshPart[] = [];

	public constructor(engine:Engine, name:string) {
		super(engine, name);
	}

	public load(meshParts:MeshPart[]):void {
		if (this.loaded) {
			return;
		}
		this.meshParts = meshParts;
		for (let part of this.meshParts) {
			part.load();
		}
		this.loaded = true;
	}

	public destroy():void {
		for (let part of this.meshParts) {
			part.destroy();
		}
	}

	public render(transform:Matrix4x4):void {
		for (let part of this.meshParts) {
			part.render(transform);
		}
	}
}