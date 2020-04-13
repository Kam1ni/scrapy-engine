import { PerspectiveCamera } from "./perspective-camera";
import { Keys, MouseButtons } from "../utils/input";
import { Vector3 } from "../math/vector3";
import { ValueInspector } from "../utils/value-inspector";
import { Engine } from "../engine";

export class FreeCamera extends PerspectiveCamera{

	public constructor(e:Engine, fovDeg?:number){
		super(e, fovDeg);
		let i = new ValueInspector("Camera position", ()=>this.transform.getTransformationMatrix().getTranslation().toString())
	}

	public updateMatrix():void {
		super.updateMatrix();
	}

	public update(dt:number):void {
		let input = this.engine.input;
		let speed = 1 * dt;
		
		let translation = Vector3.zero();
		if (input.isKeyDown(Keys.A)) {
			translation.x += speed;
		}else if (input.isKeyDown(Keys.D)) {
			translation.x -= speed;
		}

		if (input.isKeyDown(Keys.W)) {
			translation.z += speed;
		}else if (input.isKeyDown(Keys.S)) {
			translation.z -= speed;
		}

		if (input.isKeyDown(Keys.Space)) {
			translation.y -= speed;
		}else if (input.isKeyDown(Keys.LeftShift)) {
			translation.y += speed;
		}

		if (input.isMouseButtonPressed(MouseButtons.Left)) {
			this.engine.requestPointerLock();
		}


		let rotation = this.transform.rotation;
		if (this.engine.isPointerLocked() || input.isMouseButtonDown(MouseButtons.Middle)) {
			let dx = input.getMouseDiffX() / 10000.0 *dt;
			let dy = input.getMouseDiffY() / 10000.0 * dt;

			rotation.x += dy;
			rotation.y += dx;
		}

		this.transform.position = this.transform.position.add(translation.rotateY(-rotation.y));

		this.worldMatrix = this.transform.getInvertedTransformationMatrix();
	}
}