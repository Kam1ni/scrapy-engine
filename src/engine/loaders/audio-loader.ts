import { AssetLoader, ILoadedAsset } from "./asset-loader";
import { Audio } from "../assets/audio";
import { Engine } from "../engine";


export type AudioNameToUrlConverter = (audioName:string, baseUrl:string)=>string;

function defaultAudioNameToUrlConverter(audioName:string, baseUrl:string):string {
	return `${baseUrl}/assets/audio/${audioName}`;
}

export class AudioLoader extends AssetLoader<Audio>{

	private converter:AudioNameToUrlConverter;

	public constructor(engine:Engine, nameToUrlConverter:AudioNameToUrlConverter = defaultAudioNameToUrlConverter) {
		super(engine);
		this.converter = nameToUrlConverter;
	}

	protected loadAsset(asset: string):ILoadedAsset<Audio> {
		let audio = new Audio(this.engine, asset, this.converter(asset, this.engine.assetLoaders.getBaseUrl()));
		audio.load().then(()=> {
			this.emit(`/loaded/${asset}`);
		});
		return {
			asset: audio,
			refCount: 0
		};
	}

}