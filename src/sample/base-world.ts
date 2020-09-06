import { GameWorld, FreeCamera } from "@/engine/world";
import { Engine } from "@/engine/engine";
import { Color } from "@/engine/graphics";


export abstract class BaseWorld extends GameWorld {
	public constructor(engine:Engine) {
		super(engine);
		let cam = new FreeCamera(engine, 90);
		cam.transform.position.z = 100;
		cam.transform.position.y = -50;
		cam.transform.position.x = 0;
		//cam.transform.rotation.x = .5;
		//cam.transform.rotation.y = Math.PI;
		cam.speedMultiplier = .1;
		cam.sensitivityMultiplier = .5;
		this.setCamera(cam);
		this.ambientLight = new Color(25,25,25,255);
	}
}