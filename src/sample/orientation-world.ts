import { GameWorld, FreeCamera, OrthographicCamera } from "@/engine/world";
import { Cube } from "./cube";
import { Engine } from "@/engine/engine";
import { Keys } from "@/engine/utils/input";

export class OrientationWorld extends GameWorld {
	freeCam:FreeCamera;
	ortCam:OrthographicCamera;
	cube:Cube;

	constructor(engine:Engine){
		super(engine);

		let camera = new FreeCamera(this.engine, 90);
		this.setCamera(camera);
		camera.speedMultiplier = .1;
		camera.sensitivityMultiplier = .5;
		camera.transform.position.y = -10;

		this.freeCam = camera;
		this.ortCam = new OrthographicCamera(this.engine);

		this.ortCam.transform = this.freeCam.transform

		let cube = new Cube(this.engine);
		this.addChild(cube);
		this.cube = cube;
	}

	update(dt:number){
		super.update(dt)

		if (this.engine.input.isKeyPressed(Keys.Q)){
			this.setCamera(this.ortCam);
		}
		if (this.engine.input.isKeyPressed(Keys.E)){
			this.setCamera(this.freeCam);
		}

		if (this.engine.input.isKeyPressed(Keys.ArrowUp)){
			this.cube.transform.position.y += 10;
		}
		if (this.engine.input.isKeyPressed(Keys.ArrowDown)){
			this.cube.transform.position.y -= 10;
		}
		if (this.engine.input.isKeyPressed(Keys.ArrowRight)) {
			this.cube.transform.position.x += 10;
		}
		if (this.engine.input.isKeyPressed(Keys.ArrowLeft)) {
			this.cube.transform.position.x -= 10;
		}
		if (this.engine.input.isKeyPressed(Keys.R)){
			this.cube.transform.position.z += 10;
		}
		if (this.engine.input.isKeyPressed(Keys.F)){
			this.cube.transform.position.z -= 10;
		}
	}
}