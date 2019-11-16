import { Asset } from "./asset";

export class File extends Asset{
	private content:string;

	public getContent():string {
		return this.content;
	}

	public load(content:string):void {
		if (this.isLoaded()) {
			return;
		}
		this.content = content;
		this.loaded = true;
	}
}