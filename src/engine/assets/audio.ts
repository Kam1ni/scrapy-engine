import { Asset } from "./asset";
import { Engine } from "../engine";

export class Audio extends Asset {
	private audioUrl:string;
	private fetchedAudioUrl:string;

	public constructor(engine:Engine, name:string, audioUrl:string) {
		super(engine,name);
		this.audioUrl = audioUrl;
	}

	public async load():Promise<void> {
		let obj = this;
		return new Promise((resolve)=> {
			let rawFile = new XMLHttpRequest();
			rawFile.open("GET", this.audioUrl, true);
			rawFile.responseType = "blob";
			rawFile.onreadystatechange = ()=> {
				if (rawFile.readyState === 4) {
					if (rawFile.status === 200 || rawFile.status == 0) {
						obj.fetchedAudioUrl = URL.createObjectURL(rawFile.response);
						obj.loaded = true;
						resolve();
					}
				}
			};
			rawFile.send(null);
		});
	}


	private convertDataURIToBinary(data:string):Uint8Array {
		let BASE64_MARKER = ";base64,";
		let base64Index = data.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
		let base64 = data.substring(base64Index);
		let raw = window.btoa(base64);
		let rawLength = base64.length;
		let array = new Uint8Array(new ArrayBuffer(rawLength));

		for (let i = 0; i < rawLength; i++) {
			array[i] = raw.charCodeAt(i);
		}
		return array;
	}

	public destroy():void {
		URL.revokeObjectURL(this.audioUrl);
	}

	public play():HTMLAudioElement {
		let el = document.createElement("audio");
		el.src = this.fetchedAudioUrl;
		el.play();
		return el;
	}
}