import { Ray } from "@/engine/utils/ray";
import { Line } from "@/engine/world/line";
import { Color, Engine, GameContainer, Vector3, degToRad } from "@/main";

export class Particle extends GameContainer {
	public pos:Vector3 = Vector3.zero();
	public rays:Ray[] = [];

	public constructor(engine:Engine) {
		super(engine);
		for (let i = 0; i < 360; i+=1) {
			let rad = degToRad(i);
			let ray = new Ray(this.pos, new Vector3(Math.sin(rad), Math.cos(rad), 0));
			this.rays.push(ray);
		}
	}

	public updateWalls(walls:Line[]) {
		for (let child of this.getChildren()){
			child.destroy();
		}
		let color = Color.white();
		color.alpha = 50;
		for (let ray of this.rays) {
			let record = Infinity;
			let intersection:Vector3 | null = null;
			for (let wall of walls) {
				let point = ray.intersectsWithLine(wall.pos1, wall.pos2);
				if (!point) {
					continue;
				}
				let diff = point.sub(this.pos);
				let length = diff.getLength();
				if (length > record) {
					continue;
				}
				record = length;
				intersection = point;
			}
			if (!intersection) {
				continue;
			}
			this.addChild(new Line(this.engine, this.pos, intersection, color));
		}
	}

	public update(dt: number): void {
		let canvas = this.engine.getCanvas();
		this.pos.x = (this.engine.input.getMousePosX() - canvas.width / 2) / 10;
		this.pos.y = -(this.engine.input.getMousePosY() - canvas.height / 2) / 10;
		super.update(dt);
	}

}