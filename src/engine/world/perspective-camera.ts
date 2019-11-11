import { Camera } from "./camera";
import { Matrix4x4 } from "../math/matrix4x4";
import { Engine } from "../engine";
import { degToRadians } from "../math/angles";

export class PerspectiveCamera extends Camera{
	public nearClip:number = 1;
	public farClip:number = 10000;
	public fovDeg = 90;

	public constructor(engine:Engine, fovDeg:number = 60) {
		super(engine);
		this.fovDeg = fovDeg;
	}

	public updateMatrix(): void {
		let width = this.engine.getCanvas().width;
		let height = this.engine.getCanvas().height;
		this.matrix = Matrix4x4.perspective(0, width, 0, height, this.nearClip, this.farClip, degToRadians(this.fovDeg));
	}
}