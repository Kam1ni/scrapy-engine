import { Engine } from "../engine";

let currentId = 0;

export abstract class GameContainer {
	protected engine:Engine;
	private id:number;
	private children:GameContainer[] = [];
	private parent:GameContainer;

	public constructor(engine:Engine) {
		this.engine = engine;
		this.id = currentId++;
	}

	public addChild(child:GameContainer):void {
		if (child.parent) {
			throw new Error(`Cant add child ${child.id} to container ${this.id}. Child has a parent`);
		}
		this.parent = this;
		this.children.push(child);
	}

	public getId():number {
		return this.id;
	}

	public removeChild(child:GameContainer):void {
		let i = this.children.indexOf(child);
		if (i != -1) {
			child.parent = null;
			this.children.splice(i, 1);
		}
	}

	public remove():void {
		if (!this.parent) return;
		this.parent.removeChild(this);
	}

	public getParent():GameContainer {
		return this.parent;
	}

	public update(dt:number):void {
		for (let child of this.children) {
			child.update(dt);
		}

	}

	public render():void {
		for (let child of this.children) {
			child.render();
		}
	}

	public destroy():void {
		if (this.parent) {
			this.remove();
		}
		for (let child of this.children) {
			child.destroy();
		}
	}
}