import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";

export default class Experience {
  static instance; //제한적인변수? 나도잘모르겟심 ^^7

  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.world = new World();

    this.time.on("update", () => {
      this.update();
    });

    this.time.on("resize", () => {
      this.resize();
    });
  }
  resize() {
    this.camera.resize();
    this.world.update();
    this.renderer.resize();
  }
  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
