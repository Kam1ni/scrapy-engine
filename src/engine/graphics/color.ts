export class Color {
	public red:number;
	public green:number;
	public blue:number;
	public alpha:number;

	public constructor(red:number = 255, green:number = 255, blue:number = 255, alpha:number = 255) {
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = alpha;
	}

	public getRedFloat():number {
		return this.red / 255.0;
	}

	public getGreenFloat():number {
		return this.green / 255.0;
	}

	public getBlueFloat():number {
		return this.blue / 255.0;
	}

	public getAlphaFloat():number {
		return this.alpha / 255.0;
	}

	public toArray():number[] {
		return [this.red, this.green, this.blue, this.alpha];
	}

	public toFloatArray():number[] {
		return [this.getRedFloat(), this.getGreenFloat(), this.getBlueFloat(), this.getAlphaFloat()];
	}

	public toLightFloatArray():number[] {
		return [this.getRedFloat(), this.getGreenFloat(), this.getBlueFloat()];
	}

	public toFloat32Array():Float32Array {
		return new Float32Array(this.toFloatArray());
	}

	public toLightFloat32Array():Float32Array {
		return new Float32Array(this.toLightFloatArray());
	}

	public static white():Color {
		return new Color(255,255,255,255);
	}

	public static black():Color {
		return new Color(0,0,0,255);
	}

	public static red():Color {
		return new Color(255,0,0,255);
	}

	public static green():Color {
		return new Color(0,255,0, 255);
	}

	public static blue():Color {
		return new Color(0,0,255,255);
	}

	public static random():Color {
		return new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random() * 255);
	}
}