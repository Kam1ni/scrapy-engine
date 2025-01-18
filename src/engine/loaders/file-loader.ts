import { AssetLoader, ILoadedAsset } from "./asset-loader";
import { File } from "../assets/file";

export class FileLoader extends AssetLoader<File>{
	protected loadAsset(asset: string):ILoadedAsset<File> {
		let file = new File(this.engine, asset);
		let rawFile = new XMLHttpRequest();
		rawFile.open("GET", asset, true);
		rawFile.onreadystatechange = ()=> {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					let allText = rawFile.responseText;
					file.load(allText);
					this.emit(`/loaded/${asset}`);
				}
			}
		};
		rawFile.send(null);
		return {
			asset: file,
			refCount: 0
		};
	}

}