import { Color, Engine, FreeCamera, Vector3 } from "@/main";
import { BaseWorld } from "./base-world";
import { Castle } from "./castle";
import { Line } from "@/engine/world/line";

export class CastleWorld extends BaseWorld {
	private castle:Castle;

	public constructor(engine:Engine){
		super(engine);
		this.castle = new Castle(engine);
		this.addChild(this.castle);

		this.ambientLight = Color.white();

		let line = new Line(this.engine, new Vector3(1, 2.5, -5), new Vector3(1, 2.5, -10), Color.red());
		this.addChild(line);

		let cam = new FreeCamera(this.engine);
		cam.speedMultiplier = 0.01;
		cam.transform.position.y = 2.5;
		cam.transform.position.x = -5;
		//cam.transform.rotation.y = 2;
		this.setCamera(cam);
	}
}