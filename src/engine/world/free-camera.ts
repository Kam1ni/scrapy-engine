import { PerspectiveCamera } from "./perspective-camera";
import { Keys, MouseButtons } from "../utils/input";
import { Vector3 } from "../math/vector3";
import { Engine } from "../engine";
import { Quaternion } from "../math/quaternion";
import { degToRad, radToDeg } from "../math";


export class FreeCamera extends PerspectiveCamera{
	public speedMultiplier:number = 1;
	public sensitivityMultiplier:number = 5;

	public pitch:number = 90;
	public yaw:number = 0;

	public constructor(e:Engine, fovDeg?:number){
		super(e, fovDeg);
	}

	public updateMatrix():void {
		super.updateMatrix();
	}

	public update(dt:number):void {
		let input = this.engine.input;
		let speed = 1 * dt * this.speedMultiplier;
		
		let translation = Vector3.zero();
		if (input.isKeyDown(Keys.A)) {
			translation.x -= speed;
		}else if (input.isKeyDown(Keys.D)) {
			translation.x += speed;
		}

		if (input.isKeyDown(Keys.W)) {
			translation.y += speed;
		}else if (input.isKeyDown(Keys.S)) {
			translation.y -= speed;
		}

		if (input.isKeyDown(Keys.Space)) {
			translation.z += speed;
		}else if (input.isKeyDown(Keys.LeftShift)) {
			translation.z -= speed;
		}

		if (input.isMouseButtonPressed(MouseButtons.Left)) {
			this.engine.requestPointerLock();
		}

		if (this.engine.isPointerLocked() || input.isMouseButtonDown(MouseButtons.Middle)) {
			let dx = input.getMouseDiffX() / 1000.0 * dt;
			let dy = input.getMouseDiffY() / 1000.0 * dt;

			this.yaw += dx * this.sensitivityMultiplier;
			this.pitch -= dy * this.sensitivityMultiplier;
			this.pitch = Math.min(180, Math.max(0, this.pitch))
		}

		
		this.transform.rotation = Quaternion.multiply(Quaternion.fromEuler(new Vector3(0,0,-this.pitch)), Quaternion.fromEuler(new Vector3(0, this.yaw, 0)));
		this.transform.position = this.transform.position.add(translation.rotateZ(degToRad(-this.yaw)));
		console.log(this.transform.position.toString())
		super.update(dt);
	}
}