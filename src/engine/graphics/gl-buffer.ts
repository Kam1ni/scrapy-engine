import { Engine } from "../engine";
import { GlBufferAttributeInfo } from "./gl-buffer-attribute-info";



export class GLBuffer {
	private engine:Engine;
	private elementSize:number;
	private stride:number;
	private buffer:WebGLBuffer;

	private bufferType:number;
	private dataType:number;
	private mode:number;
	private typeSize:number;

	private data:number[] = [];
	private attributes:GlBufferAttributeInfo[] = [];

	public constructor(engine:Engine, elementSize:number, dataType:number = engine.gl.FLOAT, bufferType:number = engine.gl.ARRAY_BUFFER, mode:number = engine.gl.TRIANGLES) {
		this.engine = engine;
		this.elementSize = elementSize;
		this.dataType = dataType;
		this.bufferType = bufferType;
		this.mode = mode;

		this.typeSize = GLBuffer.getDataSize(engine.gl, this.dataType);
		this.stride = this.elementSize * this.typeSize;
		this.buffer = this.engine.gl.createBuffer();
	}

	public destroy():void {
		this.engine.gl.deleteBuffer(this.buffer);
	}


	public bind(normalized:boolean = false):void {
		this.engine.gl.bindBuffer(this.bufferType, this.buffer);

		for (let it of this.attributes) {
			this.engine.gl.vertexAttribPointer(it.location, it.size, this.dataType, normalized, this.stride, it.offset * this.typeSize);
			this.engine.gl.enableVertexAttribArray(it.location);
		}
	}

	public unbind():void {
		for (let it of this.attributes) {
			this.engine.gl.disableVertexAttribArray(it.location);
		}
		this.engine.gl.bindBuffer(this.bufferType, undefined);
	}

	public addAttributeLocation(info:GlBufferAttributeInfo):void {
		this.attributes.push(info);
	}

	public pushBackData(data:number[]):void {
		this.data.push(...data);
	}

	public setData(data:number[]):void {
		this.data.splice(0, this.data.length);
		this.data.push(...data);
	}

	public upload():void {
		this.engine.gl.bindBuffer(this.bufferType, this.buffer);
		let bufferData:ArrayBuffer = GLBuffer.dataToArrayBuffer(this.engine.gl, this.dataType, this.data);
		this.engine.gl.bufferData(this.bufferType, bufferData, this.engine.gl.STATIC_DRAW);
	}

	public draw():void {
		if (this.bufferType == this.engine.gl.ARRAY_BUFFER) {
			this.engine.gl.drawArrays(this.mode, 0, this.data.length / this.elementSize);
		} else if (this.bufferType == this.engine.gl.ELEMENT_ARRAY_BUFFER) {
			this.engine.gl.drawElements(this.mode, this.data.length, this.dataType, 0);
		}
	}

	private static dataToArrayBuffer(gl:WebGLRenderingContext, dataType:number, data:number[]):ArrayBuffer {
		switch (dataType){
		case gl.FLOAT:
			return new Float32Array(data);
		case gl.INT:
			return new Int32Array(data);
		case gl.UNSIGNED_INT:
			return new Uint32Array(data);
		case gl.SHORT:
			return new Int16Array(data);
		case gl.UNSIGNED_SHORT:
			return new Uint16Array(data);
		case gl.BYTE:
			return new Int8Array(data);
		case gl.UNSIGNED_BYTE:
			return new Uint8Array(data);
		}
		throw new Error(`Invalid datatype ${dataType}`);
	}


	private static getDataSize(gl:WebGLRenderingContext, dataType:number):number {
		switch (dataType){
		case gl.FLOAT:
		case gl.INT:
		case gl.UNSIGNED_INT:
			return 4;
		case gl.SHORT:
		case gl.UNSIGNED_SHORT:
			return 2;
		case gl.BYTE:
		case gl.UNSIGNED_BYTE:
			return 1;
		default:
			throw new Error(`Unrecognized data type ${dataType}`);
		}
	}
}