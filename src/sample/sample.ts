import { Engine } from "@/engine/engine";
import { SimObject } from "@/engine/world/sim-object";
import { SimpleRect } from "./simple-rect";
import { World } from "./world";
import { FreeCamera } from "@/engine/world/free-camera";

let canvas = document.createElement("canvas");
document.body.append(canvas);
let engine = new Engine(canvas);
engine.init();


let world = new World(engine);
//engine.getCamera().transform.scale.x = 4;
//engine.getCamera().transform.scale.y = 4;
//engine.getCamera().transform.scale.z = 4;
//engine.getCamera().transform.position.x = -600;
//engine.getCamera().transform.position.y = -180;
//engine.getCamera().transform.position.z = -200;
engine.setWorld(world);
engine.start();

(global as any).engine = engine;