import { AssetLoader, ILoadedAsset } from "./asset-loader";
import { Texture } from "../assets/texture";
import { Engine } from "../engine";

export type TextureNameToUrlConverter = (textureName:string, baseUrl:string)=>string;

function defaultTextureNameToUrlConverter(textureName:string, baseUrl:string):string {
	return `${baseUrl}/assets/textures/${textureName}`;
}

export class TextureLoader extends AssetLoader<Texture>{
	private urlConverter:TextureNameToUrlConverter;

	public constructor(engine:Engine, textureNameToUrlConverter:TextureNameToUrlConverter = defaultTextureNameToUrlConverter) {
		super(engine);
		this.urlConverter = textureNameToUrlConverter;
	}

	protected loadAsset(asset: string): ILoadedAsset<Texture> {
		let texture = new Texture(this.engine, asset, this.urlConverter(asset, this.engine.assetLoaders.getBaseUrl()));
		let result = {
			asset: texture,
			refCount: 0,
		};
		texture.load().then(()=> {
			this.emit(`/loaded/${asset}`);
		});
		return result;
	}

}