import { Color, Engine, OrthographicCamera, Vector3 } from "@/main";
import { BaseWorld } from "./base-world";
import { B3N } from "./b3n";
import { Line } from "@/engine/world/line";

export class Lines extends BaseWorld {
	public constructor(engine:Engine) {
		super(engine);
		let cam = new OrthographicCamera(this.engine);
		cam.transform.scale.x = .1;
		cam.transform.scale.y = .1;
		this.setCamera(cam);

		this.ambientLight = Color.white();
		let b3n = new B3N(this.engine);
		b3n.transform.position.y = 0;
		b3n.transform.position.x = 0;
		b3n.transform.position.z = 0;

		let maxX = 40;
		let maxY = 40;
		let minX = -maxX;
		let minY = -maxY;

		function getRandomPos(min:number, max:number):number {
			return (Math.random() * (max - min)) + min;
		}

		function getRandomPoint():Vector3{
			return new Vector3(getRandomPos(minX, maxX), getRandomPos(minY, maxY), 0);
		}

		for (let i = 0; i < 50; i++) {
			let line = new Line(engine, getRandomPoint(), getRandomPoint(), Color.random());
			this.addChild(line);
		}
	}
}