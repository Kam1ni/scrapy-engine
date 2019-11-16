import { TextureLoader } from "./texture-loader";
import { MeshLoader } from "./mesh-loader";
import { MaterialLoader } from "./material-loader";
import { Engine } from "../engine";
import { FileLoader } from "./file-loader";
import { AudioLoader } from "./audio-loader";

export class AssetLoaderBundle {
	public textureLoader:TextureLoader;
	public meshLoader:MeshLoader;
	public materialLoader:MaterialLoader;
	public fileLoader:FileLoader;
	public audioLoader:AudioLoader;

	public constructor(engine:Engine) {
		this.textureLoader = new TextureLoader(engine);
		this.meshLoader = new MeshLoader(engine);
		this.materialLoader = new MaterialLoader(engine);
		this.fileLoader = new FileLoader(engine);
		this.audioLoader = new AudioLoader(engine);
	}
}