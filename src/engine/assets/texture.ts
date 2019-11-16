import { Engine } from "../engine";
import { EventEmitter } from "../utils/event-emitter";
import { Asset } from "./asset";

const LEVEL:number = 0;
const BORDER:number = 0;

export enum TextureState{
	INITIAL,
	LOADING,
	LOADED
}

export class Texture extends Asset{
	protected engine:Engine;
	private textureUrl:string;
	protected handle:WebGLTexture;
	protected state:TextureState = TextureState.INITIAL;
	private width:number = 2;
	private height:number = 2;

	public constructor(engine:Engine, name:string, textureUrl?:string) {
		super(engine, name);
		this.textureUrl = textureUrl;
		
	}

	public async load():Promise<void> {
		if (this.state != TextureState.INITIAL) return;
		this.state = TextureState.LOADING;

		let img = new Image();
		img.onload = ()=> {
			this.state = TextureState.LOADED;
			this.handle = this.engine.gl.createTexture();
			this.bind();

			this.width = img.width;
			this.height = img.height;
			let gl = this.engine.gl;

			this.bind();
			gl.texImage2D(gl.TEXTURE_2D, LEVEL, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
			if (this.isPowerOf2()) {
				gl.generateMipmap(gl.TEXTURE_2D);
			}else {
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			}
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		};
		img.src = this.textureUrl;
	}
	
	public activateAndBind(textureUnit:number = 0):void {
		this.engine.gl.activeTexture(this.engine.gl.TEXTURE0 + textureUnit);
		this.bind();
	}

	public bind():void {
		if (this.state == TextureState.LOADED) {
			this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, this.handle);
		}else {
			this.engine.staticGraphics.getMissingTexture().bind();
		}
	}
	
	public unbind():void {
		if (this.state == TextureState.LOADED) {
			this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, undefined);
		}else {
			this.engine.staticGraphics.getMissingTexture().unbind();
		}
	}

	public destroy():void {
		if (this.state != TextureState.LOADED) return;
		this.engine.gl.deleteTexture(this.handle);
	}

	private isPowerOf2():boolean {
		return (this.isValuePowerOf2(this.width) && this.isValuePowerOf2(this.height));
	}

	private isValuePowerOf2(value:number):boolean {
		return (value & (value - 1)) == 0;
	}

	public getHeight():number {
		return this.height;
	}

	public getWidth():number {
		return this.width;
	}

	public isLoaded():boolean {
		return this.state == TextureState.LOADED;
	}

}