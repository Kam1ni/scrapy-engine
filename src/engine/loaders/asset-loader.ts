import { Engine } from "../engine";
import { Asset } from "../assets/asset";
import { EventEmitter } from "events";


export interface ILoadedAsset<T>{
	asset:T;
	refCount:number;
}

export abstract class AssetLoader<T extends Asset> extends EventEmitter{
	private assets:{[key:string]:ILoadedAsset<T>} = {};
	protected engine:Engine;

	public constructor(engine:Engine) {
		super();
		this.engine = engine;
	}

	protected abstract loadAsset(asset:string):ILoadedAsset<T>;

	public getAsset(assetName:string):T {
		let asset = this.assets[assetName];
		if (!asset) {
			asset = this.loadAsset(assetName);
			this.assets[assetName] = asset;
		}
		
		asset.refCount++;
		return asset.asset;
	}

	public async getLoadedAsset(assetName:string):Promise<T> {
		let asset = this.getAsset(assetName);
		if (asset.isLoaded()) {
			return asset;
		}
		return new Promise((resolve)=> {
			this.once(`/loaded/${assetName}`, ()=>resolve(asset));
		});
	}

	public release(asset:T):void {
		let a = this.assets[asset.getName()];
		if (!a) {
			asset.destroy();
			return;
		}
		a.refCount--;
		if (a.refCount <= 0) {
			delete this.assets[asset.getName()];
		}
	}

	public getLoadedAssets():number {
		let count = 0;
		for (let key of Object.keys(this.assets)) {
			if (this.assets[key].asset.isLoaded) {
				count++;
			}
		}
		return count;
	}

	public getRegisteredAssetCount():number {
		return Object.keys(this.assets).length;
	}

}