import { SimObject } from "./sim-object";
import { Vector3, Matrix4x4 } from "../math";
import { Color } from "../graphics";

export class BoundingBox extends SimObject {
	public size:Vector3 = new Vector3(16, 16, 16);
	public color:Color = Color.white();
	public shouldRender:boolean = false;


	public render():void {
		if (this.shouldRender || this.engine.renderBoundingBoxes) {
			let m = Matrix4x4.translation(this.worldMatrix.getTranslation());
			this.engine.staticGraphics.getBox().render(m, this.size, this.color);
		}
	}

	public getCenterPoint():Vector3 {
		let result = new Vector3();
		let pos = this.worldMatrix.getTranslation();
		result.x = pos.x;
		result.y = pos.y;
		result.z = pos.z;
		return result;
	}
	
	public getMinPoint():Vector3 {
		let result = new Vector3();
		let pos = this.worldMatrix.getTranslation();
		result.x = pos.x - (this.size.x / 2);
		result.y = pos.y - (this.size.y / 2);
		result.z = pos.z - (this.size.z / 2);
		return result;
	}

	public getMaxPoint():Vector3 {
		let result = new Vector3();
		let pos = this.worldMatrix.getTranslation();
		result.x = pos.x + this.size.x / 2;
		result.y = pos.y + this.size.y / 2;
		result.z = pos.z + this.size.z / 2;
		return result;
	}
	
	public isTouching(box:BoundingBox):Vector3 {
		let bMin = box.getMinPoint();
		let bMax = box.getMaxPoint();
		let bCenter = box.getCenterPoint();
		let aMin = this.getMinPoint();
		let aMax = this.getMaxPoint();
		let aCenter = this.getCenterPoint();

		let tx = bCenter.x - aCenter.x;
		let ty = bCenter.y - aCenter.y;
		let tz = bCenter.z - aCenter.z;

		let aExtent = this.size.x / 2;
		let bExtent = box.size.x / 2;
		let xOverlap = aExtent + bExtent - Math.abs(tx);
		if (xOverlap < 0) {
			return null;
		}

		aExtent = this.size.y / 2;
		bExtent = box.size.y / 2;
		let yOverlap = aExtent + bExtent - Math.abs(ty);
		if (yOverlap < 0) {
			return null;
		}

		aExtent = this.size.z / 2;
		bExtent = box.size.z / 2;
		let zOverlap = aExtent + bExtent - Math.abs(tz);
		if (zOverlap < 0) {
			return null;
		}
		
		if (Math.abs(aMin.x - bMax.x) < Math.abs(bMin.x - aMax.x)) {
			xOverlap = -xOverlap;
		}

		if (Math.abs(aMin.y - bMax.y) < Math.abs(bMin.y - aMax.y)) {
			yOverlap = -yOverlap;
		}

		if (Math.abs(aMin.z - bMax.z) < Math.abs(bMin.z - aMax.z)) {
			zOverlap = -zOverlap;
		}

		return new Vector3(xOverlap, yOverlap, zOverlap);
	}

}