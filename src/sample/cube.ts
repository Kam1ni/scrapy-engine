import { SimObject, Object3D } from "@/engine/world";
import { Engine } from "@/engine/engine";

export class Cube extends SimObject {
	private mesh:Object3D;

	public constructor(engine:Engine)	{
		super(engine);
		this.transform.scale.x = 8;
		this.transform.scale.y = 8;
		this.transform.scale.z = 8;
		this.mesh = new Object3D(engine, "coordinates-block");
		this.addChild(this.mesh);
	}
}