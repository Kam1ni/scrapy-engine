import { Engine } from "../engine";
import { GameContainer } from "./game-container";
import { Color } from "../graphics/color";
import { Vector3 } from "../math/vector3";
import { Vector4 } from "../math/vector4";
import { Shader } from "../graphics/shader";
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
		// TODO: Optimize this
		for (let shader of this.engine.staticGraphics.getShaders()){
			shader.use();
			let location = shader.getUniformLocation("u_ambient_light");
			this.engine.gl.uniform3fv(location, this.ambientLight.toLightFloat32Array());
			this.setPointLightUniforms(shader);
		}
		super.render();
	}
	
	private setPointLightUniforms(shader:Shader):void {
		let lightPositions:number[] = [];
		let lightColors:number[] = [];
		
		let lights = this.getPointLights();
		for (let i = 0; i < 16; i++) {
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