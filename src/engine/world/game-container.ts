import { Engine } from "../engine";
import { Graphic } from "../graphics/graphic";
import { Transform } from "../math/transform";
import { Matrix4x4 } from "../math/matrix4x4";

let currentId = 0;

export abstract class GameContainer {
	protected engine:Engine;
	private id:number;
	private children:GameContainer[] = [];
	private parent:GameContainer;
	protected graphics:Graphic[] = [];

	private localMatrix:Matrix4x4 = Matrix4x4.identity();
	private worldMatrix:Matrix4x4 = Matrix4x4.identity();
	private loaded:boolean = false;
	public transform:Transform = new Transform();

	public constructor(engine:Engine) {
		this.engine = engine;
		this.id = currentId++;
	}

	public addChild(child:GameContainer):void {
		if (child.parent) {
			throw new Error(`Cant add child ${child.id} to container ${this.id}. Child has a parent`);
		}
		child.parent = this;
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
		this.localMatrix = this.transform.getTransformationMatrix();
		this.updateWorldMatrix(this.parent ? this.parent.worldMatrix : null);
		
		for (let graphic of this.graphics) {
			graphic.update(dt);	
		}
		for (let child of this.children) {
			child.update(dt);
		}
	}

	public render():void {
		for (let graphic of this.graphics) {
			graphic.render(this.worldMatrix);
		}
		for (let child of this.children) {
			child.render();
		}
	}

	public load():void {
		if (this.loaded) return;
		for (let g of this.graphics) {
			g.load();
		}
		for (let child of this.children) {
			child.load();
		}
	}

	public destroy():void {
		if (!this.loaded) return;
		for (let g of this.graphics) {
			g.destroy();
		}
		if (this.parent) {
			this.remove();
		}
		for (let child of this.children) {
			child.destroy();
		}
		this.loaded = false;
	}

	
	private updateWorldMatrix(parentWorldMatrix:Matrix4x4):void {
		if (parentWorldMatrix) {
			this.worldMatrix = Matrix4x4.multiply(parentWorldMatrix, this.localMatrix);
		}else {
			this.worldMatrix.copyFrom(this.localMatrix);
		}
	}
}