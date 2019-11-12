import { Material } from "../graphics/material";
import { Color } from "../graphics/color";
import { Engine } from "../engine";
import { Texture } from "../graphics/texture";

enum LineType {
	NEW_MATERIAL,
	DIFFUSE_COLOR,
	TEXTURE,
	UNUSED
}

export type TextureSrcModifier = (src:string) => string;

export function loadMtl(engine:Engine, mtl:string, textureSrc:TextureSrcModifier = (src:string)=>src):Material[] {
	let result:Material[] = [];
	let material:Material;

	let lines = mtl.split("\n");
	for (let line of lines) {
		let lineType = getLineType(line);
		if (lineType == LineType.NEW_MATERIAL) {
			if (material) {
				result.push(material);
			}
			material = createNewMaterial(engine, line);
		}
		if (lineType == LineType.DIFFUSE_COLOR) {
			material.diffuserColor = getDiffuseColor(line);
		}
		if (lineType == LineType.TEXTURE) {
			material.texture = new Texture(engine, getTextureSrc(line, textureSrc));
		}

	}

	if (material) {
		result.push(material);
	}

	return result;
}

function getLineType(line:string):LineType {
	if (line.match(/^newmtl\s/)) {
		return LineType.NEW_MATERIAL;
	}
	if (line.match(/^Kd\s/)) {
		return LineType.DIFFUSE_COLOR;
	}
	if (line.match(/^map_Kd\s/)) {
		return LineType.TEXTURE;
	}
	return LineType.UNUSED;
}

function createNewMaterial(engine:Engine, line:string):Material {
	return new Material(engine, line.split(" ")[1]);
}

function getDiffuseColor(line:string):Color {
	let parts = line.split(" ");
	let color = new Color();
	color.red = parseFloat(parts[1]) * 255;
	color.green = color.red;
	color.blue = color.red;
	if (parts.length > 2) {
		color.green = parseFloat(parts[2]) * 255;
		color.blue = parseFloat(parts[3]) * 255;
	}
	return color;
}

function getTextureSrc(line:string, srcModifier:TextureSrcModifier):string {
	return srcModifier(line.split(" ")[1]);
}