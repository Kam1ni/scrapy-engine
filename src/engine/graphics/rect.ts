import { Graphic } from "./graphic";
import { Engine } from "../engine";
import { Transform } from "../math/transform";
import { Color } from "./color";
import { GLBuffer, AttributeInfo } from "./gl-buffer";
import { Matrix4x4 } from "../math/matrix4x4";

export class Rect extends Graphic {
	private width:number;
	private height:number;
	public color:Color = Color.white();
	private loaded:boolean = false;
	private buffer:GLBuffer;
	// TODO: Would be more efficient if only one per engine
	private textureHandle:WebGLTexture;

	public constructor(engine:Engine, width:number = 10, height:number = 10, color:Color = Color.white()) {
		super(engine);
		this.width = width;
		this.height = height;
		this.color = color;
		this.textureHandle = engine.gl.createTexture();
	}

	public destroy():void {
		if (!this.loaded) return;
		super.destroy();
		this.buffer.destroy();
		this.engine.gl.deleteTexture(this.textureHandle);
	}

	private bindTexture():void {
		this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, this.textureHandle);
	}
	
	private unbindTexture():void {
		this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, undefined);
	}

	private activateAndBindTexture(textureUnit:number = 0):void {
		this.engine.gl.activeTexture(this.engine.gl.TEXTURE0 + textureUnit);
		this.bindTexture();
	}

	public load():void {
		if (this.loaded) return;
		this.buffer = new GLBuffer(this.engine, 5);
		let positionAttribute = this.engine.getShader().getAttributeLocation("a_position");
		let info = new AttributeInfo();
		info.location = positionAttribute;
		info.size = 3;
		info.offset = 0;
		this.buffer.addAttributeLocation(info);

		let textCoordAttribute = this.engine.getShader().getAttributeLocation("a_texCoord");
		info = new AttributeInfo();
		info.location = textCoordAttribute;
		info.size = 2;
		info.offset = 3;
		this.buffer.addAttributeLocation(info);

		let vertices = [
			0,0,0,0,0,
			0,this.height,0,0,1,
			this.width, this.height, 0,1,1,
			this.width, this.height, 0,1,1,
			this.width, 0,0,1,0,
			0,0,0,0,0
		];

		let gl = this.engine.gl;
		this.buffer.pushBackData(vertices);
		this.buffer.upload();
		this.buffer.unbind();
		
		this.bindTexture();
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1,1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255,255,255,255]));
		this.unbindTexture();
		
		this.loaded = true;
	}

	public render(transform:Matrix4x4):void {
		let colorLocation = this.engine.getShader().getUniformLocation("u_color");
		this.engine.gl.uniform4fv(colorLocation, this.color.toFloat32Array());

		let transformLocation = this.engine.getShader().getUniformLocation("u_transform");
		this.engine.gl.uniformMatrix4fv(transformLocation, false, transform.toFloat32Array());

		this.activateAndBindTexture(0);
		let diffuseLocation = this.engine.getShader().getUniformLocation("u_diffuse");
		this.engine.gl.uniform1i(diffuseLocation, 0);

		this.buffer.bind();
		this.buffer.draw();
		super.render(transform);
		this.buffer.unbind();
		this.unbindTexture();
	}
}