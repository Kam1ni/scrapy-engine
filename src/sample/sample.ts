import { Engine } from "@/engine/engine";

let canvas = document.createElement("canvas");
document.body.append(canvas);
let engine = new Engine(canvas);
engine.init();
engine.start();