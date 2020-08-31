import { GameContainer, Rect } from "@/engine/world";
import { Engine } from "@/engine/engine";
import { Cube } from "./cube";
import { PointLight, Color } from "@/engine/graphics";

export class LightTesting extends GameContainer {
	public cube:Cube;
	public cube2:Cube;

	public light:PointLight;

	public constructor(engine:Engine){
		super(engine);

		this.transform.position.z = 500;

		this.cube = new Cube(engine);
		this.addChild(this.cube);
		
		this.cube2 = new Cube(engine);
		this.cube2.transform.position.x = 100;
		this.addChild(this.cube2);

		let plane = new Rect(this.engine);
		plane.color = Color.green();
		this.addChild(plane);
		

		this.light = new PointLight(this.engine);
		this.light.color = new Color(255,255,255,30000);
		this.pointLights.push(this.light);
	}

	public update(dt:number){
		let date = new Date().getTime() / 1000;
		this.cube.transform.position.x = Math.sin(date) * 50;
		this.cube.transform.position.z = Math.cos(date) * 50;

		this.cube2.transform.rotation.y = Math.sin(date) * Math.PI;

		super.update(dt);
	}
}