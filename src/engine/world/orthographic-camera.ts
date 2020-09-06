import { Camera } from "./camera";
import { Matrix4x4 } from "../math/matrix4x4";

export class OrthographicCamera extends Camera {
	public nearClip:number = -1000;
	public farClip:number = 1000;

	public updateMatrix():void {
		let halfWidth = this.engine.getCanvas().width / 2;
		let halfHeight = this.engine.getCanvas().height / 2;
		this.matrix = Matrix4x4.orthographic(-halfWidth, halfWidth, -halfHeight, halfHeight, this.nearClip, this.farClip);
	}
}