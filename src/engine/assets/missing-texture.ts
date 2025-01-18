import { Texture, TextureState } from "./texture";
import { Engine } from "../engine";

const TEMP_IMAGE_DATA:Uint8Array = new Uint8Array([255,0,255,255, 0,0,0,255, 0,0,0,255, 255,0,255,255]);

//TODO: FIX THIS
export class MissingTexture extends Texture{

	constructor(engine:Engine) {
		super(engine, "missing-texture");
	}

	public async load():Promise<void> {
		if (this.state != TextureState.INITIAL) return;
		this.state = TextureState.LOADING;
		this.handle = this.engine.gl.createTexture();

		let gl = this.engine.gl;

		this.bind();
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2,2, 0, gl.RGBA, gl.UNSIGNED_BYTE, TEMP_IMAGE_DATA);
		gl.generateMipmap(gl.TEXTURE_2D);

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