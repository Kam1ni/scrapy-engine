import { Vector3 } from "../math/vector3";

enum LineType {
	UNUSED,
	VERTEX,
	UV_COORDS,
	FACE
}

export class ObjLoader{
	public load(file:string):number[] {
		let vertices:Vector3[] = [];
		let uvCoords:Vector3[] = [];
		let lines = file.split("\n");
		let result:number[] = [];

		for (let line of lines) {
			let lineType = this.getLineType(line);
			if (lineType == LineType.VERTEX) {
				vertices.push(this.decodeVertexLine(line));
			}
			if (lineType == LineType.UV_COORDS) {
				uvCoords.push(this.decodeUVCoordLine(line));
			}
		}
		
		for (let line of lines) {
			let lineType = this.getLineType(line);
			if (lineType == LineType.FACE) {
				result.push(...this.decodeFaceLine(line, vertices, uvCoords));
			}
		}
		

		return result;
	}

	private getLineType(line:string):LineType {
		if (line.match(/^v\s/)) {
			return LineType.VERTEX;
		}

		if (line.match(/^f\s/)) {
			return LineType.FACE;
		}

		if (line.match(/^vt\s/)) {
			return LineType.UV_COORDS;
		}
		return LineType.UNUSED;
	}


	private decodeVertexLine(line:string):Vector3 {
		let vec = new Vector3();
		let part = line.split(" ");
		vec.x = parseFloat(part[1]);
		vec.y = parseFloat(part[2]);
		vec.z = parseFloat(part[3]);
		return vec;
	}

	private decodeUVCoordLine(line:string):Vector3 {
		let vec = new Vector3();
		let part = line.split(" ");
		vec.x = parseFloat(part[1]);
		vec.y = parseFloat(part[2]);
		vec.z = parseFloat(part[3]) || 0;
		return vec;
	}

	private decodeFaceLine(line:string, vertices:Vector3[], uvCoords:Vector3[]):number[] {
		let parts = line.split(" ");
		let v1 = this.decodeFacePart(parts[1]);
		let v2 = this.decodeFacePart(parts[2]);
		let v3 = this.decodeFacePart(parts[3]);
		let uv1 = this.decodeFaceUVPart(parts[1]);
		let uv2 = this.decodeFaceUVPart(parts[2]);
		let uv3 = this.decodeFaceUVPart(parts[3]);
	
		return [
			...vertices[v1-1].toArray(), ...this.getUVs(uvCoords[uv1-1]),
			...vertices[v2-1].toArray(), ...this.getUVs(uvCoords[uv2-1]),
			...vertices[v3-1].toArray(), ...this.getUVs(uvCoords[uv3-1]),
		];

	}

	private decodeFacePart(part:string):number {
		let parts = part.split("/");
		return parseFloat(parts[0]);
	}

	private decodeFaceUVPart(part:string):number {
		let parts = part.split("/");
		return parseFloat(parts[1]);
	}

	private getUVs(vector:Vector3):number[] {
		return [vector.x, vector.y];
	}
}