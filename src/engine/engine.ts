import { Color } from "./graphics/color";
import { Shader } from "./graphics/shader";
import { MeshShader } from "./graphics/mesh-shader";
import { GameWorld } from "./world/game-world";
import { OrthographicCamera } from "./world/orthographic-camera";
import { Camera } from "./world/camera";
import { StaticAssets } from "./assets/static-assets";
import { Input } from "./utils/input";
import { AssetLoaderBundle } from "./loaders/asset-loader-bundle";
import { Vector2 } from "./math";
import { ValueInspector } from "./utils/value-inspector";

export class Engine{
	private canvasSize:Vector2;
	private canvas:HTMLCanvasElement;
	private _gl:WebGL2RenderingContext;
	private running:boolean;
	private prevFrameTime:number = 0;
	private clearColor:Color = Color.black();
	private world:GameWorld;
	public staticGraphics = new StaticAssets(this);
	public input:Input = new Input(this);
	public assetLoaders:AssetLoaderBundle = new AssetLoaderBundle(this);
	public renderBoundingBoxes:boolean = false;
	public maxFrameTime:number = 250;
	private hasPointerLock:boolean = false;
	private frameBuffer:WebGLFramebuffer;

	


	public constructor(canvas:HTMLCanvasElement) {
		this.canvas = canvas;
		this.canvas.style.userSelect = "none";
		this.canvas.addEventListener("contextmenu", e=>e.preventDefault());
		this.world = new GameWorld(this);
	}

	public get gl():WebGL2RenderingContext {
		return this._gl;
	}

	public init():void {
		this.initGL();
		this.staticGraphics.load();
	
		this.input.init();

		this.applyCanvasSize = this.applyCanvasSize.bind(this);
		this.onPointerLockChanged = this.onPointerLockChanged.bind(this);
		window.addEventListener("resize", this.applyCanvasSize);
		document.addEventListener("pointerlockchange",this.onPointerLockChanged, false);
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
		if (this.canvasSize) {
			this.canvas.width = this.canvasSize.x;
			this.canvas.height = this.canvasSize.y;
		} else {
			this.canvas.width = this.canvas.parentElement.clientWidth;
			this.canvas.height = this.canvas.parentElement.clientHeight;
		}
		this._gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	}

	public destroy():void {
		window.removeEventListener("resize", this.applyCanvasSize);
		document.removeEventListener("pointerlockchange", this.onPointerLockChanged, false);
		this.world.destroy();
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
		if (dt > this.maxFrameTime) {
			dt = this.maxFrameTime;
		}
		
		this.world.update(dt);

		for (let shader of this.staticGraphics.getShaders()){
			shader.use();
			let projectionPosition = shader.getUniformLocation("u_projection");
			this.gl.uniformMatrix4fv(projectionPosition, false, this.world.getCamera().getMatrix().toFloat32Array());
			
			let transformLocation = shader.getUniformLocation("u_view");
			this.gl.uniformMatrix4fv(transformLocation, false, this.getWorld().getCamera().getViewMatrix().toFloat32Array());
		}

		this.frameBuffer = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);

		let fragColorTexture = this.createFrameBufferTexture(true);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, fragColorTexture, 0);

		let fragPosTexture = this.createFrameBufferTexture(true);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT1, this.gl.TEXTURE_2D, fragPosTexture, 0);

		let normalVectorTexture = this.createFrameBufferTexture(true);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT2, this.gl.TEXTURE_2D, normalVectorTexture, 0);

		let depthTexture = this.createDepthTexture()
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, depthTexture, 0);

		let status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
		if (status != this.gl.FRAMEBUFFER_COMPLETE){
			console.error(status);
		}
		
		this.gl.drawBuffers([
			this.gl.COLOR_ATTACHMENT0,
			this.gl.COLOR_ATTACHMENT1,
			this.gl.COLOR_ATTACHMENT2,
		])
		
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.world.render();

		let lightingFrameBuffer = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, lightingFrameBuffer);

		let lightIntensityTexture = this.createFrameBufferTexture(false);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, lightIntensityTexture, 0);

		this.gl.drawBuffers([
			this.gl.COLOR_ATTACHMENT0
		]);

		this.gl.blendFunc(this.gl.ONE, this.gl.ONE);

		this.staticGraphics.getAmbientLightRect().render(this.world.ambientLight);
		let lights = this.world.getPointLights();
		for (let light of lights) {
			light.render(fragPosTexture, normalVectorTexture);
		}

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.staticGraphics.getCombineShaderRect().render(fragColorTexture, lightIntensityTexture);

		this.gl.deleteTexture(fragColorTexture);
		this.gl.deleteTexture(fragPosTexture);
		this.gl.deleteTexture(normalVectorTexture);
		this.gl.deleteTexture(lightIntensityTexture);
		this.gl.deleteTexture(depthTexture);
		this.gl.deleteFramebuffer(this.frameBuffer);
		this.gl.deleteFramebuffer(lightingFrameBuffer);

		this.input.update();

		ValueInspector.update();

		requestAnimationFrame(this.loop.bind(this));
	}

	private createFrameBufferTexture(isStorage:boolean):WebGLTexture{
		let tex = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
		if (isStorage){
			this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
			this.gl.texStorage2D(this.gl.TEXTURE_2D, 1, this.gl.RGBA16F, this.getCanvas().width, this.getCanvas().height);
		}else{
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.getCanvas().width, this.getCanvas().height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
		}
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		return tex;
	}

	private createDepthTexture():WebGLTexture{
		let tex = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.DEPTH_COMPONENT16, this.getCanvas().width, this.getCanvas().height, 0, this.gl.DEPTH_COMPONENT, this.gl.UNSIGNED_SHORT, null);
		return tex
	}

	private initGL():void {
		this._gl = this.canvas.getContext("webgl2");
		if (!this.gl) {
			throw new Error("WebGL 2 is not available in this browser");
		}

		// Enables transparency
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		// Enables depth
		this.gl.enable(this.gl.DEPTH_TEST);

		if (!this.gl.getExtension('EXT_color_buffer_float') == null) {
			console.log('No EXT_color_buffer_float not supported, this test will fail');
		}

		this.setClearColor(this.clearColor);

		this.frameBuffer = this.gl.createFramebuffer();
	}

	private onPointerLockChanged():void {
		this.hasPointerLock = document.pointerLockElement == this.canvas;
	}

	public getWorld():GameWorld {
		return this.world;
	}

	public setWorld(world:GameWorld):void {
		if (this.world) {
			this.world.destroy();
		}
		this.world = world;
	}

	public getCanvas():HTMLCanvasElement {
		return this.canvas;
	}

	public isPointerLocked():boolean {
		return this.hasPointerLock;
	}

	public requestPointerLock():void {
		this.canvas.requestPointerLock();
	}

	public releasePointerLock():void {
		document.exitPointerLock();
	}

	public getCanvasSize():Vector2 {
		return this.canvasSize;
	}

	public setCanvasSize(size:Vector2):void {
		this.canvasSize = size;
		this.applyCanvasSize();
	}
}