import { Camera } from "./camera";
import { Matrix4x4 } from "../math/matrix4x4";

export class PerspectiveCamera extends Camera{
	public nearClip:number = -1;
	public farClip:number = 100;

	public updateMatrix(): void {
		let width = this.engine.getCanvas().width;
		let height = this.engine.getCanvas().height;
		this.matrix = Matrix4x4.perspective(width, height, this.nearClip, this.farClip, 1.4);
	}
}