import { Engine } from "../engine";
import { GameContainer } from "./game-container";
import { Color } from "../graphics/color";
import { Vector3 } from "../math/vector3";
import { Vector4 } from "../math/vector4";
import { Shader } from "../graphics/shader";

export class GameWorld extends GameContainer {
	public ambientLight:Color = Color.white();

	public render():void {
		let shader = this.engine.getShader();
		let location = shader.getUniformLocation("u_ambient_light");
		this.engine.gl.uniform3fv(location, this.ambientLight.toLightFloat32Array());

		this.setPointLightUniforms(shader);
		super.render();
	}
	
	private setPointLightUniforms(shader:Shader):void {
		let lightPositions:number[] = [];
		let lightColors:number[] = [];
		
		let lights = this.getPointLights();
		for (let i = 0; i < 64; i++) {
			let light = lights[i];
			if (light) {
				lightPositions.push(...light.worldTransform.getTranslation().toFloat32Array());
				lightColors.push(...light.color.toFloat32Array());
			}else {
				lightPositions.push(...new Float32Array([0.0,0.0,0.0]));
				lightColors.push(...new Float32Array([0.0,0.0,0.0,0.0]));
			}
		}

		let lightPositionLocation = shader.getUniformLocation("u_point_light_positions[0]");
		let lightColorLocation = shader.getUniformLocation("u_point_light_color[0]");
		this.engine.gl.uniform3fv(lightPositionLocation, new Float32Array(lightPositions));
		this.engine.gl.uniform4fv(lightColorLocation, new Float32Array(lightColors));
	}
} 