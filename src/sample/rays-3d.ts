import { Color, Engine, Quaternion, Rect, Vector3 } from "@/main";
import { BaseWorld } from "./base-world";
import { DebugCamera } from "@/engine/world/debug-camera";

export class Rays3D extends BaseWorld {
	public walls:Rect[] = [];

	public constructor(engine:Engine) {
		super(engine);
		let cam = new DebugCamera(this.engine);
		cam.speedMultiplier = 0.005;
		this.setCamera(cam);

		this.ambientLight = Color.white();

		let floor = new Rect(this.engine, 100, 100, new Color(150,150,150));
		floor.transform.rotation = Quaternion.fromEuler(new Vector3(0,0,90));
		this.addChild(floor);

		let rect = new Rect(this.engine, 10, 10, Color.red());
		rect.transform.position.y = 5;
		rect.renderBorder = true;
		rect.borderColor = Color.white();
		rect.transform.rotation = Quaternion.fromEuler(new Vector3(0, 0, 0));
		this.walls.push(rect);
		this.addChild(rect);
	}

	public update(dt: number): void {
		super.update(dt);
	}
}