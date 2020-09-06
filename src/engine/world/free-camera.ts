import { PerspectiveCamera } from "./perspective-camera";
import { Keys, MouseButtons } from "../utils/input";
import { Vector3 } from "../math/vector3";
import { ValueInspector } from "../utils/value-inspector";
import { Engine } from "../engine";

export class FreeCamera extends PerspectiveCamera{

	public speedMultiplier:number = 1;
	public sensitivityMultiplier:number = 1;

	public constructor(e:Engine, fovDeg?:number){
		super(e, fovDeg);
		let i = new ValueInspector("Camera position", ()=>this.transform.getTransformationMatrix().getTranslation().toString())
	}

	public updateMatrix():void {
		super.updateMatrix();
	}

	public update(dt:number):void {
		let input = this.engine.input;
		let speed = 1 * dt * this.speedMultiplier;
		
		let translation = Vector3.zero();
		if (input.isKeyDown(Keys.A)) {
			translation.x += speed;
		}else if (input.isKeyDown(Keys.D)) {
			translation.x -= speed;
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


		let rotation = this.transform.rotation;
		if (this.engine.isPointerLocked() || input.isMouseButtonDown(MouseButtons.Middle)) {
			let dx = input.getMouseDiffX() / 1000.0 * dt * this.sensitivityMultiplier;
			let dy = input.getMouseDiffY() / 1000.0 * dt * this.sensitivityMultiplier;

			rotation.x += dy;
			rotation.z -= dx;
		}

		this.transform.position = this.transform.position.add(translation.rotateZ(-rotation.z));

		this.worldMatrix = this.transform.getInvertedTransformationMatrix();
	}
}