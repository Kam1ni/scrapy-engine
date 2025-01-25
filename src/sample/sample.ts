/* eslint-disable @typescript-eslint/no-unused-vars */
import { Engine } from "@/engine/engine";
import { World } from "./world";
import { FreeCamera } from "@/engine/world/free-camera";
import { LightTesting } from "./light-testing";
import { ShaderTest } from "./shader-test";
import { OrientationWorld } from "./orientation-world";
import { Lines } from "./lines";
import { CastleWorld } from "./castle-world";
import { Rays3D } from "./rays-3d";

let canvas = document.createElement("canvas");
document.body.append(canvas);
let engine = new Engine(canvas);
engine.init();


let world = new Rays3D(engine);
//engine.getCamera().transform.scale.x = 4;
//engine.getCamera().transform.scale.y = 4;
//engine.getCamera().transform.scale.z = 4;
//engine.getCamera().transform.position.x = -600;
//engine.getCamera().transform.position.y = -180;
//engine.getCamera().transform.position.z = -200;
engine.setWorld(world);
engine.start();

(global as any).engine = engine;