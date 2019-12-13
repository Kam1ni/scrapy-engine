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
	private baseUrl:string;

	public constructor(engine:Engine) {
		this.setBaseUrl(window.location.href);
		this.textureLoader = new TextureLoader(engine);
		this.meshLoader = new MeshLoader(engine);
		this.materialLoader = new MaterialLoader(engine);
		this.fileLoader = new FileLoader(engine);
		this.audioLoader = new AudioLoader(engine);
	}

	public getBaseUrl():string {
		return this.baseUrl;
	}

	public setBaseUrl(value:string):void {
		this.baseUrl = value;
		if (this.baseUrl.match(/\.html?$/)) {
			let parts = this.baseUrl.split("/");
			parts.pop();
			this.baseUrl = parts.join("/");
		}
		if (this.baseUrl.charAt(this.baseUrl.length-1) == "/") {
			this.baseUrl = this.baseUrl.substr(0, this.baseUrl.substr.length-2);
		}
	}
}