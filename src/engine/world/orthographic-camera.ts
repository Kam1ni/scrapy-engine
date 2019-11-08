import { Camera } from "./camera";
import { Matrix4x4 } from "../math/matrix4x4";

export class OrthographicCamera extends Camera {
	public nearClip:number = -1;
	public farClip:number = 100;

	public updateMatrix():void {
		this.matrix = Matrix4x4.orthographic(0, this.engine.getCanvas().width, this.engine.getCanvas().height, 0, this.nearClip, this.farClip);
	}
}