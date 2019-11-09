import { Engine } from "@/engine/engine";
import { SimObject } from "@/engine/world/sim-object";
import { SimpleRect } from "./simple-rect";

let canvas = document.createElement("canvas");
document.body.append(canvas);
let engine = new Engine(canvas);
engine.init();

let rect = new SimpleRect(engine);
//rect.transform.position.y = 100;
//rect.transform.position.x = 100;
rect.transform.scale.x = 10;
rect.transform.scale.y = 10;
rect.load();

engine.getWorld().addChild(rect);
engine.start();