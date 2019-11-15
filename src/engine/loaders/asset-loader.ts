import { Engine } from "../engine";

interface ILoadedAsset<T>{
	asset:T;
	refCount:number;
}

export abstract class AssetLoader<T>{
	private assets:{[key:string]:ILoadedAsset<T>} = {};
	protected engine:Engine;

	public constructor(engine:Engine) {
		this.engine = engine;
	}

	public abstract loadAsset(asset:any):void;
}