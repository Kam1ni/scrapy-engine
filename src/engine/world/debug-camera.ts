import { Engine } from "../engine";
import { Vector3 } from "../math";
import { FreeCamera } from "./free-camera";

export class DebugCamera extends FreeCamera {
	public constructor(engine:Engine){
		super(engine);
		this.transform.position = new Vector3(...JSON.parse(sessionStorage.getItem("debug-camera-position") || "[]"));
		let rot= JSON.parse(sessionStorage.getItem("debug-camera-rotation") || "[0,0]");
		this.pitch = rot[0];
		this.yaw = rot[1];
	}

	public update(dt:number){
		super.update(dt);
		sessionStorage.setItem("debug-camera-position", JSON.stringify(this.transform.position.toArray()));
		sessionStorage.setItem("debug-camera-rotation", JSON.stringify([this.pitch, this.yaw]));
	}
}