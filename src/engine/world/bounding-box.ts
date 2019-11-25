import { SimObject } from "./sim-object";
import { Vector3, Matrix4x4 } from "../math";
import { Color } from "../graphics";

export class BoundingBox extends SimObject {
	public size:Vector3 = new Vector3(16, 16, 16);
	public color:Color = Color.white();


	public render():void {
		let m = Matrix4x4.translation(this.worldMatrix.getTranslation())
		this.engine.staticGraphics.getBox().render(m, this.size, this.color);
	}
	
}