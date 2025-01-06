export class Vector2 {
	public x:number;
	public y:number;

	constructor(x:number = 0, y:number = 0) {
		this.x = x;
		this.y = y;
	}

	public toArray():number[] {
		return [this.x, this.y];
	}

	public toFloat32Array():Float32Array {
		return new Float32Array(this.toArray());
	}

	public copyFrom(vector:Vector2):void {
		this.x = vector.x;
		this.y = vector.y;
	}

	public multiply(vec:Vector2):Vector2 {
		return new Vector2(this.x * vec.x, this.y * vec.y);
	}

	public add(v:Vector2):Vector2 {
		return new Vector2(this.x + v.x, this.y + v.y);
	}

	public getUniform():Vector2 {
		if (this.x == 0 && this.y == 0){
			return new Vector2(1,0);
		}
		let length = this.getLength();
		let result = new Vector2(this.x / length, this.y / length);
		return result;
	}

	public getLength():number {
		let num = this.x * this.x + this.y * this.y;
		return Math.sqrt(num);
	}

	public sub(v:Vector2):Vector2 {
		return new Vector2(this.x - v.y, this.y - v.y);
	}

	public static one():Vector2 {
		return new Vector2(1,1);
	}

	public static zero():Vector2 {
		return new Vector2(0,0);
	}

	public toString():string{
		let n = this.toArray().map(i=>i.toFixed(2))
		return `x: ${n[0]}; y: ${n[1]}`
	}
}

(window as any).Vector2 = Vector2