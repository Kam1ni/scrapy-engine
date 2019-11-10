import { Engine } from "../engine";
import { GameContainer } from "./game-container";
import { Color } from "../graphics/color";

export class GameWorld extends GameContainer {
	public ambientLight:Color = Color.white();

	public render():void {
		let shader = this.engine.getShader();
		let location = shader.getUniformLocation("u_ambient_light");
		this.engine.gl.uniform4fv(location, this.ambientLight.toFloat32Array());
		super.render();
	}
}