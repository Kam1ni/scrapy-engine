import { Matrix4x4, Transform, Vector3 } from "../math";

export class Plane {
	public width:number = 0;
	public height:number = 0;
	public transform:Transform = new Transform();

	public constructor(width:number, height:number) {
		this.width = width;
		this.height = height;
	}

	public getCorners(worldMatrix?:Matrix4x4):Vector3[]{
		let matrix = this.getTransformMatrix(worldMatrix);
		let corner1 = new Vector3(-this.width/2, this.height/2, 0);
		let corner4 = new Vector3(this.width/2, this.height/2, 0);
		let corner3 = new Vector3(this.width/2, -this.height/2, 0);
		let corner2 = new Vector3(-this.width/2, -this.height/2, 0);
		return [
			matrix.vector3Multiply(corner1),
			matrix.vector3Multiply(corner2),
			matrix.vector3Multiply(corner3),
			matrix.vector3Multiply(corner4),
		];
	}

	private getTransformMatrix(worldMatrix?:Matrix4x4):Matrix4x4{
		if (worldMatrix) {
			return worldMatrix.multiply(this.transform.getTransformationMatrix());
		}
		return this.transform.getTransformationMatrix();
	}

}