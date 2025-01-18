import { Engine } from "../engine";
import { GameContainer } from "./game-container";
import { Color } from "../graphics/color";
import { Camera } from "./camera";
import { OrthographicCamera } from "./orthographic-camera";

export class GameWorld extends GameContainer {
	public ambientLight:Color = Color.white();
	private camera:Camera = new OrthographicCamera(this.engine);

	public constructor(engine:Engine){
		super(engine);
		this.addChild(this.camera);
		this.camera.updateMatrix();
	}

	public getCamera():Camera{
		return this.camera;
	}

	public setCamera(cam:Camera){
		this.removeChild(this.getCamera());
		this.camera = cam;
		this.camera.updateMatrix();
		this.addChild(this.camera);
	}

	public render():void {
		super.render();
	}

}