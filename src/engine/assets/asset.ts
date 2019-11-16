import { Engine } from "../engine";

export abstract class Asset {
	protected engine:Engine;
	protected loaded:boolean;
	private name:string;

	constructor(engine:Engine, name:string) {
		this.engine = engine;
		this.name = name;
	}

	public destroy():void {}

	public isLoaded():boolean {
		return this.loaded;
	}

	public getName():string {
		return this.name;
	}
}