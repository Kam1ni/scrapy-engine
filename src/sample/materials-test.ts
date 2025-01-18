import { Object3D } from "@/engine/world/object-3d";
import { Engine } from "@/engine/engine";

export class MaterialsTest extends Object3D{

	public constructor(engine:Engine) {
		super(engine, "materials_test");
		this.transform.scale.x = 8;
		this.transform.scale.y = 8;
		this.transform.scale.z = 8;
		this.transform.position.x = 100;
		this.transform.position.z = -5;
	}
}