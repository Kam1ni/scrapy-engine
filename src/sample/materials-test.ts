import { SimObject } from "@/engine/world/sim-object";
import obj from "@/assets/models/materials_test.obj";
import mtl from "@/assets/models/materials_test.mtl";
import * as png from "assets/textures/texture.png";
import { Mesh } from "@/engine/assets/mesh";
import { loadObjWithMtl } from "@/engine/loaders/obj-loader";
import { Object3D } from "@/engine/graphics/object-3d";

export class MaterialsTest extends SimObject{
	public load():void {
		console.log(png);
		let mesh = loadObjWithMtl(this.engine, obj, mtl, (str)=> `src/assets/textures/${str}`);
		mesh.load();
		this.graphics.push(new Object3D(this.engine, mesh));
		this.transform.scale.x = 8;
		this.transform.scale.y = 8;
		this.transform.scale.z = 8;
		this.transform.position.x = 100;
		this.transform.position.z = -5;
		super.load();
	}
}