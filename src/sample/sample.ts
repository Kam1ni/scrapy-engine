import { Engine } from "@/engine/engine";
import { SimObject } from "@/engine/world/sim-object";
import { SimpleRect } from "./simple-rect";
import { World } from "./world";
import { PerspectiveCamera } from "@/engine/world/perspective-camera";

let canvas = document.createElement("canvas");
document.body.append(canvas);
let engine = new Engine(canvas);
engine.init();
let cam = new PerspectiveCamera(engine);
//engine.setCamera(cam);

/*
let rect = new SimpleRect(engine);
rect.transform.position.y = 100;
rect.transform.position.x = 100;
rect.transform.scale.x = 5;
rect.transform.scale.y = 5;
rect.load();
*/

let world = new World(engine);
engine.getCamera().transform.scale.x = 4;
engine.getCamera().transform.scale.y = 4;
engine.getCamera().transform.position.y = -(engine.getCanvas().height - 16 * 4);
engine.setWorld(world);
engine.start();