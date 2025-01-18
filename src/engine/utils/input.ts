import { Engine } from "../engine";
import { MouseButtons } from "./mouse-buttons";
import { Keys } from "./keys";
import { ScrapyTouch } from "./scrap-touch";



// TODO: Add on destroy
export class Input {
	private engine:Engine;
	private initialized:boolean = false;

	private keysDown:Keys[] = [];
	private keysPressed:Keys[] = [];
	private keysReleased:Keys[] = [];

	private mouseButtonsDown:MouseButtons[] = [];
	private mouseButtonsPressed:MouseButtons[] = [];
	private mouseButtonsReleased:MouseButtons[] = [];

	private mousePos:{x:number, y:number} = {x: 0, y: 0};
	private mouseDiff:{x:number, y:number, scroll:number} = {x: 0, y: 0, scroll: 0};

	private touches:ScrapyTouch[] = [];
	private newTouches:ScrapyTouch[] = [];
	private releasedTouches:ScrapyTouch[] = [];

	public ignoreInputs:boolean = false;
	public autoIgnoreInputs:boolean = true;

	constructor(engine:Engine) {
		this.engine = engine;
	}

	public init():void {
		if (this.initialized) return;
		this.initialized = true;

		window.addEventListener("keydown", this.onKeyDown.bind(this));
		window.addEventListener("keyup", this.onKeyUp.bind(this));
		this.engine.getCanvas().addEventListener("mousedown", this.onMouseButtonDown.bind(this));
		this.engine.getCanvas().addEventListener("mouseup", this.onMouseButtonUp.bind(this));
		this.engine.getCanvas().addEventListener("mousemove", this.onMouseMove.bind(this));
		window.addEventListener("wheel", this.onScroll.bind(this));
		this.engine.getCanvas().addEventListener("touchstart", this.onTouchStart.bind(this));
		this.engine.getCanvas().addEventListener("touchend", this.onTouchEnd.bind(this));
		this.engine.getCanvas().addEventListener("touchcancel", this.onTouchEnd.bind(this));
		this.engine.getCanvas().addEventListener("touchmove", this.onTouchMove.bind(this));
	}

	private onKeyDown(event:KeyboardEvent):void {
		if (this.shouldIgnoreInputs()) return;
		event.preventDefault();
		Input.addToArray(this.keysDown, event.code);
		Input.addToArray(this.keysPressed, event.code);
	}

	private onKeyUp(event:KeyboardEvent):void {
		if (this.shouldIgnoreInputs()) return;
		event.preventDefault();
		Input.removeFromArray(this.keysDown, event.code);
		Input.addToArray(this.keysReleased,  event.code);
	}

	private onMouseButtonDown(event:MouseEvent):void {
		if (this.shouldIgnoreInputs()) return;
		event.preventDefault();
		Input.addToArray(this.mouseButtonsDown, event.button);
		Input.addToArray(this.mouseButtonsPressed, event.button);
	}

	private onMouseButtonUp(event:MouseEvent):void {
		if (this.shouldIgnoreInputs()) return;
		event.preventDefault();
		Input.removeFromArray(this.mouseButtonsDown, event.button);
		Input.addToArray(this.mouseButtonsReleased, event.button);
	}

	private shouldIgnoreInputs():boolean {
		if (this.ignoreInputs) return true;
		if (this.autoIgnoreInputs) {
			if (document.activeElement){
				return ["input", "select", "textarea", "button"].indexOf(document.activeElement.tagName.toLowerCase()) != -1;
			}
		}
		return false;
	}

	private onMouseMove(event:MouseEvent):void {
		event.preventDefault();
		this.mousePos = {
			x: event.clientX,
			y: event.clientY
		};
		this.mouseDiff.x = event.movementX;
		this.mouseDiff.y = event.movementY;
	}

	private onScroll(event:WheelEvent):void {
		//event.preventDefault();
		this.mouseDiff.scroll = event.deltaY;
	}


	private onTouchStart(event:TouchEvent):void {
		for (let i = 0; i < event.changedTouches.length; i++) {
			let touch = event.changedTouches.item(i);
			let scrapyTouch = new ScrapyTouch();
			scrapyTouch.x = touch.clientX;
			scrapyTouch.y = touch.clientY;
			scrapyTouch.xDiff = 0;
			scrapyTouch.yDiff = 0;
			scrapyTouch.id = touch.identifier;
			this.touches.push(scrapyTouch);
			this.newTouches.push(scrapyTouch);
		}
	}

	private onTouchEnd(event:TouchEvent):void {
		for (let i = 0; i < event.changedTouches.length; i++) {
			let touch = event.changedTouches.item(i);
			let index = this.touches.findIndex(t=>t.id == touch.identifier);
			if (index != -1) {
				this.releasedTouches.push(this.touches[i]);
				this.touches.splice(index, 1);
			}
		}
	}

	private onTouchMove(event:TouchEvent):void {
		for (let i = 0; i < event.changedTouches.length; i++) {
			let touch = event.changedTouches.item(i);
			let foundTouch = this.touches.find(t=>t.id == touch.identifier);
			if (foundTouch) {
				foundTouch.xDiff = foundTouch.x - touch.clientX;
				foundTouch.yDiff = foundTouch.y - touch.clientY;
				foundTouch.x = touch.clientX;
				foundTouch.y = touch.clientY;
			}
		}
	}

	private static addToArray(array:any[], value:any):void {
		if (array.indexOf(value) == -1) {
			array.push(value);
		}
	}

	private static removeFromArray(array:any[], value:any):void {
		let i = array.indexOf(value);
		if (i != -1) {
			array.splice(i, 1);
		}
	}


	public update():void {
		if (this.ignoreInputs) return;
		this.keysPressed = [];
		this.keysReleased = [];
		this.mouseButtonsPressed = [];
		this.mouseButtonsReleased = [];
		this.mouseDiff = {x: 0,y: 0,scroll: 0};
		this.newTouches = [];
		this.releasedTouches = [];
	}

	public isKeyDown(key:Keys):boolean {
		return this.keysDown.indexOf(key) != -1;
	}

	public isKeyPressed(key:Keys):boolean {
		return this.keysPressed.indexOf(key) != -1;
	}

	public isKeyReleased(key:Keys):boolean {
		return this.keysReleased.indexOf(key) != -1;
	}

	public isMouseButtonDown(button:MouseButtons):boolean {
		return this.mouseButtonsDown.indexOf(button) != -1;
	}

	public isMouseButtonPressed(button:MouseButtons):boolean {
		return this.mouseButtonsPressed.indexOf(button) != -1;
	}

	public isMouseButtonReleased(button:MouseButtons):boolean {
		return this.mouseButtonsReleased.indexOf(button) != -1;
	}

	public getMousePosX():number {
		return this.mousePos.x;
	}

	public getMousePosY():number {
		return this.mousePos.y;
	}

	public getMouseDiffX():number {
		return this.mouseDiff.x;
	}

	public getMouseDiffY():number {
		return this.mouseDiff.y;
	}

	public getMouseScroll():number {
		return this.mouseDiff.scroll;
	}

	public getTouches():ScrapyTouch[] {
		return this.touches;
	}

	public getNewTouches():ScrapyTouch[] {
		return this.newTouches;
	}

	public getReleasedTouches():ScrapyTouch[] {
		return this.releasedTouches;
	}
}


