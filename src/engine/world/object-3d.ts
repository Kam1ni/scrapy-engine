import { Mesh } from "../assets/mesh";
import { Engine } from "../engine";
import { SimObject } from "./sim-object";

export class Object3D extends SimObject{
	protected mesh:Mesh;

	public constructor(engine:Engine, meshName:string) {
		super(engine);
		this.mesh = this.engine.assetLoaders.meshLoader.getAsset(meshName);
	}

	public destroy():void {
		this.engine.assetLoaders.meshLoader.release(this.mesh);
		super.destroy();
	}

	public render(): void {
		this.mesh.render(this.worldMatrix);
		super.render();
	}

}