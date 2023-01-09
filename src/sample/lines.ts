import { Color, Engine, OrthographicCamera, Vector3 } from "@/main";
import { BaseWorld } from "./base-world";
import { B3N } from "./b3n";
import { Line } from "@/engine/world/line";
import { Particle } from "./particle";

export class Lines extends BaseWorld {
	public particle:Particle;
	public walls:Line[] = [];

	public constructor(engine:Engine) {
		super(engine);
		let cam = new OrthographicCamera(this.engine);
		cam.transform.scale.x = .1;
		cam.transform.scale.y = .1;
		this.setCamera(cam);

		this.ambientLight = Color.white();
		
		let maxX = this.engine.getCanvas().width / 2 / 10;
		let maxY = this.engine.getCanvas().height / 2 / 10;
		let minX = -maxX;
		let minY = -maxY;

		function getRandomPos(min:number, max:number):number {
			return (Math.random() * (max - min)) + min;
		}

		function getRandomPoint():Vector3{
			return new Vector3(getRandomPos(minX, maxX), getRandomPos(minY, maxY), 0);
		}

		for (let i = 0; i < 10; i++) {
			let line = new Line(engine, getRandomPoint(), getRandomPoint(), Color.random());
			this.walls.push(line);
			this.addChild(line);
		}

		let topWall = new Line(engine, new Vector3(minX, maxY, 0), new Vector3(maxX, maxY, 0), Color.white());
		let leftWall = new Line(engine, new Vector3(minX, minY, 0), new Vector3(minX, maxY, 0), Color.white());
		let rightWall = new Line(engine, new Vector3(maxX, minY, 0), new Vector3(maxX, maxY, 0), Color.white());
		let bottomWall = new Line(engine, new Vector3(minX, minY, 0), new Vector3(maxY, minY, 0), Color.white());
		this.walls.push(topWall, leftWall, rightWall, bottomWall);
		this.addChild(topWall);
		this.addChild(leftWall);
		this.addChild(rightWall);
		this.addChild(bottomWall);

		this.particle = new Particle(engine);
		this.addChild(this.particle);
	}

	public update(dt: number): void {
		this.particle.updateWalls(this.walls);
		super.update(dt);
	}
}