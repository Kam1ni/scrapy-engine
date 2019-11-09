import { Engine } from "../engine";

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

	constructor(engine:Engine) {
		this.engine = engine;
	}

	public init():void {
		if (this.initialized) return;
		this.initialized = true;

		window.addEventListener("keydown", this.onKeyDown.bind(this));
		window.addEventListener("keyup", this.onKeyUp.bind(this));
		window.addEventListener("mousedown", this.onMouseButtonDown.bind(this));
		window.addEventListener("mouseup", this.onMouseButtonUp.bind(this));
		window.addEventListener("mousemove", this.onMouseMove.bind(this));
		window.addEventListener("wheel", this.onScroll.bind(this));
	}

	private onKeyDown(event:KeyboardEvent):void {
		event.preventDefault();
		Input.addToArray(this.keysDown, event.code);
		Input.addToArray(this.keysPressed, event.code);
	}

	private onKeyUp(event:KeyboardEvent):void {
		event.preventDefault();
		Input.removeFromArray(this.keysDown, event.code);
		Input.addToArray(this.keysReleased,  event.code);
	}

	private onMouseButtonDown(event:MouseEvent):void {
		event.preventDefault();
		Input.addToArray(this.mouseButtonsDown, event.button);
		Input.addToArray(this.mouseButtonsPressed, event.button);
	}

	private onMouseButtonUp(event:MouseEvent):void {
		event.preventDefault();
		Input.removeFromArray(this.mouseButtonsDown, event.button);
		Input.addToArray(this.mouseButtonsReleased, event.button);
	}

	private onMouseMove(event:MouseEvent):void {
		event.preventDefault();
		let currentPos = this.mousePos;
		this.mousePos = {
			x:event.clientX,
			y:event.clientY
		};
		this.mouseDiff.x = currentPos.x - event.clientX;
		this.mouseDiff.y = currentPos.y - event.clientY;
	}

	private onScroll(event:WheelEvent):void {
		event.preventDefault();
		this.mouseDiff.scroll = event.deltaY;
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
		this.keysPressed = [];
		this.keysReleased = [];
		this.mouseButtonsPressed = [];
		this.mouseButtonsReleased = [];
		this.mouseDiff = {x:0,y:0,scroll:0};
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