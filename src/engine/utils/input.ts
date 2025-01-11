import { Engine } from "../engine";

export class ScrapyTouch {
	public x:number = 0;
	public y:number = 0;
	public xDiff:number = 0;
	public yDiff:number = 0;
	public id:number;
}

// TODO: Add on destroy
export class Input {
	private engine:Engine;
	private initialized:boolean = false;

	private keysDown:string[] = [];
	private keysPressed:string[] = [];
	private keysReleased:string[] = [];

	private mouseButtonsDown:number[] = [];
	private mouseButtonsPressed:number[] = [];
	private mouseButtonsReleased:number[] = [];

	private mousePos:{x:number, y:number} = {x:0, y:0};
	private mouseDiff:{x:number, y:number, scroll:number} = {x:0, y:0, scroll:0};

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
				return ["input", "select", "textarea", "button"].indexOf(document.activeElement.tagName.toLowerCase()) != -1
			}
		}
		return false;
	}

	private onMouseMove(event:MouseEvent):void {
		event.preventDefault();
		this.mousePos = {
			x:event.clientX,
			y:event.clientY
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
		this.mouseDiff = {x:0,y:0,scroll:0};
		this.newTouches = [];
		this.releasedTouches = [];
	}

	public isKeyDown(key:string):boolean {
		return this.keysDown.indexOf(key) != -1;
	}

	public isKeyPressed(key:string):boolean {
		return this.keysPressed.indexOf(key) != -1;
	}

	public isKeyReleased(key:string):boolean {
		return this.keysReleased.indexOf(key) != -1;
	}

	public isMouseButtonDown(button:number):boolean {
		return this.mouseButtonsDown.indexOf(button) != -1;
	}

	public isMouseButtonPressed(button:number):boolean {
		return this.mouseButtonsPressed.indexOf(button) != -1;
	}

	public isMouseButtonReleased(button:number):boolean {
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

export class Keys {
	private constructor() {}

	public static readonly A = "KeyA";
	public static readonly B = "KeyB";
	public static readonly C = "KeyC";
	public static readonly D = "KeyD";
	public static readonly E = "KeyE";
	public static readonly F = "KeyF";
	public static readonly G = "KeyG";
	public static readonly H = "KeyH";
	public static readonly I = "KeyI";
	public static readonly J = "KeyJ";
	public static readonly K = "KeyK";
	public static readonly L = "KeyL";
	public static readonly M = "KeyM";
	public static readonly N = "KeyN";
	public static readonly O = "KeyO";
	public static readonly P = "KeyP";
	public static readonly Q = "KeyQ";
	public static readonly R = "KeyR";
	public static readonly S = "KeyS";
	public static readonly T = "KeyT";
	public static readonly U = "KeyU";
	public static readonly V = "KeyV";
	public static readonly W = "KeyW";
	public static readonly X = "KeyX";
	public static readonly Y = "KeyY";
	public static readonly Z = "KeyZ";
	
	public static Digit1 = "Digit1";
	public static Digit2 = "Digit2";
	public static Digit3 = "Digit3";
	public static Digit4 = "Digit4";
	public static Digit5 = "Digit5";
	public static Digit6 = "Digit6";
	public static Digit7 = "Digit7";
	public static Digit8 = "Digit8";
	public static Digit9 = "Digit9";
	public static Digit0 = "Digit0";

	public static Numpad1 = "Numpad1";
	public static Numpad2 = "Numpad2";
	public static Numpad3 = "Numpad3";
	public static Numpad4 = "Numpad4";
	public static Numpad5 = "Numpad5";
	public static Numpad6 = "Numpad6";
	public static Numpad7 = "Numpad7";
	public static Numpad8 = "Numpad8";
	public static Numpad9 = "Numpad9";
	public static Numpad0 = "Numpad0";
	
	public static F1 = "F1";
	public static F2 = "F2";
	public static F3 = "F3";
	public static F4 = "F4";
	public static F5 = "F5";
	public static F6 = "F6";
	public static F7 = "F7";
	public static F8 = "F8";
	public static F9 = "F9";
	public static F10 = "F10";
	public static F11 = "F11";
	public static F12 = "F12";

	public static readonly Esc = "Escape";
	public static readonly Backquote = "Backquote";
	public static readonly Minus = "Minus";
	public static readonly Equal = "Equal";
	public static readonly Enter = "Enter";
	public static readonly Space = "Space";
	public static readonly Period = "Period";
	public static readonly Comma = "Comma";
	public static readonly Slash = "Slash";
	public static readonly Backslash = "Backslash";
	public static readonly Semicolor = "Semicolon";
	public static readonly Quote = "Quote";
	public static readonly LeftBracket = "BracketLeft";
	public static readonly RightBracket = "BracketRight";
	public static readonly Tab = "Tab";

	public static readonly ArrowLeft = "ArrowLeft";
	public static readonly ArrowUp = "ArrowUp";
	public static readonly ArrowDown = "ArrowDown";
	public static readonly ArrowRight = "ArrowRight";


	public static readonly LeftShift = "ShiftLeft";
	public static readonly LeftControl = "ControlLeft";
	public static readonly LeftAlt = "AltLeft";
	public static readonly RightShift = "ShiftRight";
	public static readonly RightControl = "ControlRight";
	public static readonly RightAlt = "AltRight";
}

export class MouseButtons {
	private constructor() {}
	public static readonly Left:number = 0;
	public static readonly Middle:number = 1;
	public static readonly Right:number = 2;
}