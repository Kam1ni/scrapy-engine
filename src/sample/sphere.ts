import { GameContainer } from "@/engine/world/game-container";
import { ObjLoader } from "@/engine/loaders/obj-loader";
import sphereObj from "assets/models/sphere.obj";
import { Mesh } from "@/engine/graphics/mesh";
import { Color } from "@/engine/graphics/color";

export class Sphere extends GameContainer {
	private mesh:Mesh;
	public load():void {

		let objLoader = new ObjLoader();
		let vertices = objLoader.load(sphereObj);
		this.mesh = new Mesh(this.engine, vertices);
		this.mesh.load();
		this.graphics.push(this.mesh);

		this.transform.position.x = 100;
		this.transform.position.y = 50;
		this.transform.scale.x = 10;
		this.transform.scale.y = 10;
		this.transform.scale.z = 10;
		this.mesh.color = Color.red();
	}
}