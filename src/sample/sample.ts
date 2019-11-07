import { Engine } from "@/engine/engine";
import { SimObject } from "@/engine/world/sim-object";
import { SimpleRect } from "./simple-rect";

let canvas = document.createElement("canvas");
document.body.append(canvas);
let engine = new Engine(canvas);
let rect = new SimpleRect(engine);

rect.transform.position.y = 100;

engine.getWorld().addChild(rect);
engine.init();
engine.start();