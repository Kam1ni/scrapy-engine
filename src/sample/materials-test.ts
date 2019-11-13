import { SimObject } from "@/engine/world/sim-object";
import obj from "@/assets/models/materials_test.obj";
import mtl from "@/assets/models/materials_test.mtl";
import * as png from "assets/textures/texture.png";
import { Mesh } from "@/engine/graphics/mesh";
import { loadObjWithMtl } from "@/engine/loaders/obj-loader";

export class MaterialsTest extends SimObject{
	public load():void {
		console.log(png);
		let mesh = loadObjWithMtl(this.engine, obj, mtl, (str)=> `src/assets/textures/${str}`);
		this.graphics.push(mesh);
		this.transform.scale.x = 8;
		this.transform.scale.y = 8;
		this.transform.scale.z = 8;
		this.transform.position.x = 100;
		this.transform.position.z = -5;
		super.load();
	}
}