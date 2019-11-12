import { Camera } from "./camera";
import { Matrix4x4 } from "../math/matrix4x4";

export class OrthographicCamera extends Camera {
	public nearClip:number = -1000;
	public farClip:number = 1000;

	public updateMatrix():void {
		this.matrix = Matrix4x4.orthographic(0, this.engine.getCanvas().width, 0, this.engine.getCanvas().height, this.nearClip, this.farClip);
	}
}