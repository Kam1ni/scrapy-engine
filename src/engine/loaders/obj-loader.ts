import { Vector3 } from "../math/vector3";
import { Engine } from "../engine";
import { TextureSrcModifier, loadMtl } from "./mtl-loader";
import { Mesh } from "../assets/mesh";
import { MeshPart } from "../assets/mesh-part";
import { Material } from "../assets/material";

enum LineType {
	UNUSED,
	VERTEX,
	UV_COORDS,
	USE_MTL,
	FACE
}

interface IMeshVericesAndUVs {
	vertices:Vector3[];
	uvCoords:Vector3[];
}

export function loadObjTriangles(file:string):number[] {
	let lines = file.split("\n");
	let result:number[] = [];

	let faces = getMeshVerticesAndUVs(file);

	for (let line of lines) {
		let lineType = getLineType(line);
		if (lineType == LineType.FACE) {
			result.push(...decodeFaceLine(line, faces));
		}
	}
	
	return result;
}

function getMeshVerticesAndUVs(obj:string):IMeshVericesAndUVs {
	let vertices:Vector3[] = [];
	let uvCoords:Vector3[] = [];
	let lines = obj.split("\n");
	for (let line of lines) {
		let lineType = getLineType(line);
		if (lineType == LineType.VERTEX) {
			vertices.push(decodeVertexLine(line));
		}
		if (lineType == LineType.UV_COORDS) {
			uvCoords.push(decodeUVCoordLine(line));
		}
	}

	return {
		vertices,
		uvCoords
	};
}

function getLineType(line:string):LineType {
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
	return LineType.UNUSED;
}


function decodeVertexLine(line:string):Vector3 {
	let vec = new Vector3();
	let part = line.split(" ");
	vec.x = parseFloat(part[1]);
	vec.y = parseFloat(part[2]);
	vec.z = parseFloat(part[3]);
	return vec;
}

function decodeUVCoordLine(line:string):Vector3 {
	let vec = new Vector3();
	let part = line.split(" ");
	vec.x = parseFloat(part[1]);
	vec.y = parseFloat(part[2]);
	vec.z = parseFloat(part[3]) || 0;
	return vec;
}

function decodeFaceLine(line:string, faces:IMeshVericesAndUVs):number[] {
	let parts = line.split(" ");
	let v1 = decodeFacePart(parts[1]);
	let v2 = decodeFacePart(parts[2]);
	let v3 = decodeFacePart(parts[3]);
	let uv1 = decodeFaceUVPart(parts[1]);
	let uv2 = decodeFaceUVPart(parts[2]);
	let uv3 = decodeFaceUVPart(parts[3]);

	return [
		...faces.vertices[v1-1].toArray(), ...getUVs(faces.uvCoords[uv1-1]),
		...faces.vertices[v2-1].toArray(), ...getUVs(faces.uvCoords[uv2-1]),
		...faces.vertices[v3-1].toArray(), ...getUVs(faces.uvCoords[uv3-1]),
	];

}

function decodeFacePart(part:string):number {
	let parts = part.split("/");
	return parseFloat(parts[0]);
}

function decodeFaceUVPart(part:string):number {
	let parts = part.split("/");
	return parseFloat(parts[1]);
}

function getUVs(vector:Vector3):number[] {
	return [vector.x, -vector.y];
}

function getMaterialName(line:string):string {
	return line.split(" ")[1];
}


export function loadObjWithMtl(engine:Engine, obj:string, mtl:string, textureSrc:TextureSrcModifier):Mesh {
	let meshParts:MeshPart[] = [];
	let materials = loadMtl(engine, mtl, textureSrc);
	let verticesAndUVs = getMeshVerticesAndUVs(obj);
	let lines = obj.split("\n");

	let meshVertices:number[];
	let meshMaterial:Material;
	for (let line of lines) {
		let lineType = getLineType(line);
		if (lineType == LineType.USE_MTL) {
			if (meshVertices) {
				meshParts.push(new MeshPart(engine, meshVertices, meshMaterial));
			}
			meshVertices = [];
			meshMaterial = materials.find(m=>m.getName() == getMaterialName(line));
		}
		if (lineType == LineType.FACE) {
			meshVertices.push(...decodeFaceLine(line, verticesAndUVs));
		}
	}

	if (meshVertices) {
		meshParts.push(new MeshPart(engine, meshVertices, meshMaterial));
	}

	let mesh = new Mesh(engine, meshParts);
	return mesh;
}