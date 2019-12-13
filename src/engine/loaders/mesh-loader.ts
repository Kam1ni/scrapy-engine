import { AssetLoader, ILoadedAsset } from "./asset-loader";
import { Mesh } from "../assets/mesh";
import { Engine } from "../engine";
import { Vector3 } from "../math/vector3";
import { MeshPart } from "../assets/mesh-part";
import { Material } from "../assets/material";

export type MeshNameToObjConverter = (engine:Engine, name:string)=>Promise<string>;

enum LineType {
	UNUSED,
	VERTEX,
	UV_COORDS,
	USE_MTL,
	MTL_FILE_NAME,
	FACE
}

interface IMeshVericesAndUVs {
	vertices:Vector3[];
	uvCoords:Vector3[];
}

async function defaultMeshNameToObjConverter(engine:Engine,name:string):Promise<string> {
	return (await engine.assetLoaders.fileLoader.getLoadedAsset(`${engine.assetLoaders.getBaseUrl()}/assets/models/${name}.obj`)).getContent();
}

export class MeshLoader extends AssetLoader<Mesh>{
	public meshNameToObjConverter:MeshNameToObjConverter;

	public constructor(engine:Engine, converter:MeshNameToObjConverter = defaultMeshNameToObjConverter) {
		super(engine);
		this.meshNameToObjConverter = converter;
	}

	protected loadAsset(asset: string): ILoadedAsset<Mesh> {
		let mesh = new Mesh(this.engine, asset);

		this.meshNameToObjConverter(this.engine, asset).then((obj)=> {
			this.loadObjWithMtl(mesh, obj);
			this.emit(`/loaded/${asset}`);
		});

		return {
			asset:mesh,
			refCount:0
		};
	}

	private getMeshVerticesAndUVs(obj:string):IMeshVericesAndUVs {
		let vertices:Vector3[] = [];
		let uvCoords:Vector3[] = [];
		let lines = obj.split("\n");
		for (let line of lines) {
			let lineType = this.getLineType(line);
			if (lineType == LineType.VERTEX) {
				vertices.push(this.decodeVertexLine(line));
			}
			if (lineType == LineType.UV_COORDS) {
				uvCoords.push(this.decodeUVCoordLine(line));
			}
		}
	
		return {
			vertices,
			uvCoords
		};
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
		if (line.match(/^usemtl\s/)) {
			return LineType.USE_MTL;
		}
		if (line.match(/^mtllib\s/)) {
			return LineType.MTL_FILE_NAME;
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
	
	private decodeFaceLine(line:string, faces:IMeshVericesAndUVs):number[] {
		let parts = line.split(" ");
		let v1 = this.decodeFacePart(parts[1]);
		let v2 = this.decodeFacePart(parts[2]);
		let v3 = this.decodeFacePart(parts[3]);
		let uv1 = this.decodeFaceUVPart(parts[1]);
		let uv2 = this.decodeFaceUVPart(parts[2]);
		let uv3 = this.decodeFaceUVPart(parts[3]);
	
		return [
			...faces.vertices[v1-1].toArray(), ...this.getUVs(faces.uvCoords[uv1-1]),
			...faces.vertices[v2-1].toArray(), ...this.getUVs(faces.uvCoords[uv2-1]),
			...faces.vertices[v3-1].toArray(), ...this.getUVs(faces.uvCoords[uv3-1]),
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
		return [vector.x, -vector.y];
	}
	
	private getMaterialName(line:string, objName:string):string {
		return `${objName}/${line.split(" ")[1]}`;
	}

	private getMaterialFileName(line:string):string {
		return line.split(" ")[1];
	}
	
	
	private loadObjWithMtl(mesh:Mesh, obj:string):void {
		let meshParts:MeshPart[] = [];
		let verticesAndUVs = this.getMeshVerticesAndUVs(obj);
		let lines = obj.split("\n");
	
		let meshVertices:number[];
		let materialName:string;
		let materialFileName:string;
		for (let line of lines) {
			let lineType = this.getLineType(line);
			if (lineType == LineType.MTL_FILE_NAME) {
				materialFileName = this.getMaterialFileName(line);
			}
			if (lineType == LineType.USE_MTL) {
				if (meshVertices) {
					meshParts.push(new MeshPart(this.engine, meshVertices, materialName));
				}
				meshVertices = [];
				materialName = this.getMaterialName(line, materialFileName);
			}
			if (lineType == LineType.FACE) {
				meshVertices.push(...this.decodeFaceLine(line, verticesAndUVs));
			}
		}
	
		if (meshVertices) {
			meshParts.push(new MeshPart(this.engine, meshVertices, materialName));
		}
	
		mesh.load(meshParts);
	}
}