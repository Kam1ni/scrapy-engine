import { SimObject } from "@/engine/world/sim-object";
import { Mesh } from "@/engine/assets/mesh";
import { Object3D } from "@/engine/graphics/object-3d";

export class MaterialsTest extends SimObject{
	public load():void {
		let mesh = this.engine.assetLoaders.meshLoader.getAsset("materials_test");
		this.graphics.push(new Object3D(this.engine, mesh));
		this.transform.scale.x = 8;
		this.transform.scale.y = 8;
		this.transform.scale.z = 8;
		this.transform.position.x = 100;
		this.transform.position.z = -5;
		super.load();
	}
}