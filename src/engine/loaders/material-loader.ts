import { AssetLoader, ILoadedAsset } from "./asset-loader";
import { Material } from "../assets/material";
import { Engine } from "../engine";
import { Color } from "../graphics/color";

export type MaterialNameToMtlConverter = (engine:Engine, name:string)=>Promise<string>;

async function defaultMaterialNameToMtlConverer(engine:Engine, name:string):Promise<string> {
	let fileName = name.split("/")[0];
	let file = await engine.assetLoaders.fileLoader.getLoadedAsset(`${engine.assetLoaders.getBaseUrl()}/assets/models/${fileName}`);
	return file.getContent();
}

enum LineType {
	NEW_MATERIAL,
	DIFFUSE_COLOR,
	TEXTURE,
	UNUSED,
}

export class MaterialLoader extends AssetLoader<Material>{

	public nameToMtlConverter:MaterialNameToMtlConverter;

	public constructor(engine:Engine, converter:MaterialNameToMtlConverter = defaultMaterialNameToMtlConverer) {
		super(engine);
		this.nameToMtlConverter = converter;
	}

	protected loadAsset(asset: string):ILoadedAsset<Material> {
		let material = new Material(this.engine, asset);
		this.nameToMtlConverter(this.engine, asset).then((mtl:string)=> {
			this.loadMtl(mtl, material);
			this.emit(`/loaded/${asset}`);
		});
		return {
			asset: material,
			refCount: 0
		};
	}

	private loadMtl(mtl:string, material:Material):void {
		let isCurrentMaterial = false;

		let lines = mtl.split("\n");
		for (let line of lines) {
			let lineType = this.getLineType(line);
			if (lineType == LineType.NEW_MATERIAL) {
				if (isCurrentMaterial) {
					material.load();
					return;
				}
				let materialName = this.getMaterialName(line);
				if (materialName == material.getName().split("/")[1]) {
					isCurrentMaterial = true;
				}
			}
			if (!isCurrentMaterial) {
				continue;
			}
			if (lineType == LineType.DIFFUSE_COLOR) {
				material.diffuserColor = this.getDiffuseColor(line);
			}
			if (lineType == LineType.TEXTURE) {
				material.texture = this.engine.assetLoaders.textureLoader.getAsset(this.getTextureSrc(line));
			}
		}
	}

	private getLineType(line:string):LineType {
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

	private getMaterialName(line:string):string {
		return line.split(" ")[1];
	}

	private getDiffuseColor(line:string):Color {
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

	private getTextureSrc(line:string):string {
		return line.split(" ")[1];
	}
}