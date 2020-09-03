import { Texture, TextureState } from "./texture";
import { Engine } from "../engine";

export class NormalMap extends Texture{
	
	constructor(engine:Engine) {
		super(engine, "diffuse");
	}

	public async load():Promise<void> {
		if (this.state != TextureState.INITIAL) return;
		this.state = TextureState.LOADING;
		this.handle = this.engine.gl.createTexture();

		let gl = this.engine.gl;

		this.bind();
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1,1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([128,128,255,255]));
	
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		this.state = TextureState.LOADED;
	}

	public bind():void {
		this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, this.handle);
	}
	
	public unbind():void {
		this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, undefined);
	}
}