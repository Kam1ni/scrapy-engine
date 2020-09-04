import { GameContainer, Rect } from "@/engine/world";
import { Engine } from "@/engine/engine";
import { Cube } from "./cube";
import { PointLight, Color } from "@/engine/graphics";
import { Keys } from "@/engine/utils/input";
import { BaseWorld } from "./base-world";

export class LightTesting extends BaseWorld {
	private paused:boolean = false;
	public cube:Cube;
	public cube2:Cube;

	public light:PointLight;

	public constructor(engine:Engine){
		super(engine);

		this.cube = new Cube(engine);
		this.addChild(this.cube);
		
		this.cube2 = new Cube(engine);
		this.cube2.transform.position.x = 50;
		this.addChild(this.cube2);

		let plane = new Rect(this.engine);
		plane.color = Color.green();
		this.addChild(plane);
		

		this.light = new PointLight(this.engine);
		this.light.color = new Color(255,255,255,20000);
		this.pointLights.push(this.light);
	}

	public update(dt:number){
		if (this.engine.input.isKeyPressed(Keys.G)){
			this.paused = !this.paused;
		}

		if (this.paused) return;
		let date = new Date().getTime() / 500;
		this.cube.transform.position.x = Math.sin(date) * 50;
		this.cube.transform.position.z = Math.cos(date) * 50;

		this.cube2.transform.rotation.y = Math.sin(date) * Math.PI;

		super.update(dt);
	}
}