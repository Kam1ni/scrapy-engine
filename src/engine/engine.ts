import { Color } from "./graphics/color";
import { Shader } from "./graphics/shader";
import { BasicShader } from "./graphics/basic-shader";
import { GameWorld } from "./world/game-world";
import { OrthographicCamera } from "./world/orthographic-camera";
import { Camera } from "./world/camera";
import { StaticAssets } from "./assets/static-assets";
import { Input } from "./utils/input";

export class Engine{
	private canvas:HTMLCanvasElement;
	private _gl:WebGLRenderingContext;
	private resizeSub:()=>void;
	private running:boolean;
	private prevFrameTime:number = 0;
	private clearColor:Color = Color.black();
	private shader:Shader = new BasicShader(this);
	private world:GameWorld = new GameWorld(this);
	private camera:Camera = new OrthographicCamera(this);
	public staticGraphics = new StaticAssets(this);
	public input:Input = new Input(this);

	public constructor(canvas:HTMLCanvasElement) {
		this.canvas = canvas;
		this.canvas.style.userSelect = "none";
		this.canvas.addEventListener("contextmenu", e=>e.preventDefault());
	}

	public get gl():WebGLRenderingContext {
		return this._gl;
	}

	public init():void {
		this.initGL();
		this.shader.load();
		this.shader.use();
		
		this.input.init();
		this.staticGraphics.load();

		this.world.load();
		this.resizeSub = this.applyCanvasSize.bind(this);
		window.addEventListener("resize", this.resizeSub);
		this.applyCanvasSize();
	}

	public start():void {
		if (this.running) return;
		this.running = true;
		this.prevFrameTime = new Date().getTime();
		requestAnimationFrame(this.loop.bind(this));
	}

	public stop():void {
		this.running = false;
	}

	public isRunning():boolean {
		return this.running;
	}
	
	public applyCanvasSize():void {
		this.canvas.width = this.canvas.parentElement.clientWidth;
		this.canvas.height = this.canvas.parentElement.clientHeight;
		this.camera.updateMatrix();
		this._gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	}
	
	public destroy():void {
		window.removeEventListener("resize", this.resizeSub);
	}

	public getClearColor():Color {
		return this.clearColor;
	}

	public setClearColor(color:Color):void {
		this.clearColor = color;
		if (this.gl) {
			this.gl.clearColor(color.getRedFloat(), color.getGreenFloat(), color.getBlueFloat(), color.getAlphaFloat());
		}
	}

	private loop():void {
		if (!this.running) return;
		let currentTime = new Date().getTime();
		let dt = currentTime - this.prevFrameTime;
		this.prevFrameTime = currentTime;
		if (dt > 250) {
			dt = 250;
		}
		
		this.world.update(dt);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		let projectionPosition = this.shader.getUniformLocation("u_projection");
		this.gl.uniformMatrix4fv(projectionPosition, false, this.camera.getViewMatrix().toFloat32Array());

		let uvOffset = this.shader.getUniformLocation("u_uvOffset");
		this.gl.uniform2fv(uvOffset, new Float32Array([0.0,0.0]));

		let uvSize = this.shader.getUniformLocation("u_uvSize");
		this.gl.uniform2fv(uvSize, new Float32Array([1.0,1.0]));

		this.world.render();
		this.input.update();
		requestAnimationFrame(this.loop.bind(this));
	}

	private initGL():void {
		this._gl = this.canvas.getContext("webgl");
		if (!this.gl) {
			throw new Error("WebGL is not available in this browser");
		}

		// Enables transparency
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		// Enables depth
		this.gl.getExtension("EXT_frag_depth");
		this.gl.enable(this.gl.DEPTH_TEST);

		this.setClearColor(this.clearColor);
	}

	public getShader():Shader {
		return this.shader;
	}

	public setShader(shader:Shader):void {
		this.shader = shader;
	}

	public getWorld():GameWorld {
		return this.world;
	}

	public setWorld(world:GameWorld):void {
		if (this.world) {
			this.world.destroy();
		}
		this.world = world;
		this.world.load();
	}

	public getCamera():Camera {
		return this.camera;
	}

	public setCamera(cam:Camera):void {
		this.camera = cam;
		cam.updateMatrix();
	}

	public getCanvas():HTMLCanvasElement {
		return this.canvas;
	}
}