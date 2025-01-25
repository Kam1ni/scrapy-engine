import { Color, Engine, Quaternion, Ray, Rect, Vector3 } from "@/main";
import { BaseWorld } from "./base-world";
import { DebugCamera } from "@/engine/world/debug-camera";
import { Line } from "@/engine/world/line";
import { B3N } from "./b3n";

export class Rays3D extends BaseWorld {
	public walls:Rect[] = [];
	public ray:Ray;
	public line:Line;

	public constructor(engine:Engine) {
		super(engine);
		let cam = new DebugCamera(this.engine);
		cam.speedMultiplier = 0.005;
		this.setCamera(cam);

		this.ambientLight = Color.white();

		let floor = new Rect(this.engine, 100, 100, new Color(150,150,150));
		floor.transform.rotation = Quaternion.fromEuler(new Vector3(90,0, 0));
		this.addChild(floor);

		let rect = new Rect(this.engine, 10, 10, Color.red());
		rect.transform.position.y = 5;
		rect.renderBorder = true;
		rect.borderColor = Color.white();
		rect.transform.rotation = Quaternion.fromEuler(new Vector3(0, 90, 0));

		let ben = new B3N(this.engine);
		ben.transform.position = new Vector3(-10, 0, 0);
		ben.transform.rotation = Quaternion.fromEuler(new Vector3(0, 90, 0));
		this.addChild(ben);

		this.walls.push(rect);
		this.addChild(rect);

		this.ray = new Ray(new Vector3(-10, 5, 0), new Vector3(1,0,0));
		this.line = new Line(this.engine, this.ray.position, new Vector3(50, 5, 0), Color.green());
		this.addChild(this.line);
	}

	public update(dt: number): void {
		super.update(dt);
		let intersection = this.ray.intersectsWithPlane(this.walls[0].getCorners());
		if (!intersection){
			this.line.pos2 = new Vector3(50, 5, 0);
		}else{
			this.line.pos2 = intersection;
		}
	}

	public render(){
		super.render();
	}
}