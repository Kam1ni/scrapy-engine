import { SimObject } from "./sim-object";
import { Vector3, Matrix4x4 } from "../math";
import { Color } from "../graphics";

export class BoundingBox extends SimObject {
	public size:Vector3 = new Vector3(16, 16, 16);
	public color:Color = Color.white();


	public render():void {
		let m = Matrix4x4.translation(this.worldMatrix.getTranslation());
		this.engine.staticGraphics.getBox().render(m, this.size, this.color);
	}
	
	public getMinPoint():Vector3 {
		let result = new Vector3();
		let pos = this.worldMatrix.getTranslation();
		result.x = pos.x - this.size.x / 2;
		result.y = pos.y;
		result.z = pos.z - this.size.z / 2;
		return result;
	}

	public getMaxPoint():Vector3 {
		let result = new Vector3();
		let pos = this.worldMatrix.getTranslation();
		result.x = pos.x + this.size.x / 2;
		result.y = pos.y + this.size.y;
		result.z = pos.z + this.size.z / 2;
		return result;
	}
	
	public isTouching(box:BoundingBox):Vector3 {
		let a = this.getMinPoint();
		let b = box.getMinPoint();
	
		let xCollisionPoint = a.x - b.x;
		if ((Math.abs(xCollisionPoint) * 2) > (this.size.x + box.size.x)) {
			return null;
		}
	
		let yCollisionPoint = a.y - b.y;
		if ((Math.abs(yCollisionPoint) * 2) > (this.size.y + box.size.y)) {
			return null;
		}

		let zCollisionPoint = a.z - b.z;
		if ((Math.abs(zCollisionPoint) * 2) > (this.size.z + box.size.z)) {
			return null;
		}

		return new Vector3(-xCollisionPoint, -yCollisionPoint, -zCollisionPoint);
	}
}