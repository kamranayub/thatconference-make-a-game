import {
  Engine,
  Actor,
  Color,
  Input,
  vec,
  Body,
  Collider,
  Shape,
  CollisionType,
} from "excalibur";

let ground: Actor;

class Player extends Actor {
  constructor() {
    super({
      x: game.halfDrawWidth,
      y: 768 - ground.height,
      width: 32,
      height: 32,
      color: Color.Red,
      anchor: vec(0, 1),
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(32, 32),
          type: CollisionType.Active,
        }),
      }),
    });
  }

  movementState: "idle" | "left" | "right" = "idle";

  onPreUpdate() {
    if (game.input.keyboard.wasPressed(Input.Keys.Up)) {
      this.jump();
    }

    if (
      this.movementState === "idle" &&
      game.input.keyboard.isHeld(Input.Keys.Right)
    ) {
      this.vel.setTo(25, 0);
      this.movementState = "right";
    }

    if (
      this.movementState === "right" &&
      game.input.keyboard.wasReleased(Input.Keys.Right)
    ) {
      this.movementState = "idle";
    }

    if (
      this.movementState === "idle" &&
      game.input.keyboard.isHeld(Input.Keys.Left)
    ) {
      this.vel.setTo(-25, 0);
      this.movementState = "left";
    }

    if (
      this.movementState === "left" &&
      game.input.keyboard.wasReleased(Input.Keys.Left)
    ) {
      this.movementState = "idle";
    }

    if (this.movementState === "idle") {
      this.vel.setTo(0, 0);
    }
  }

  jump() {}
}

class Game extends Engine {
  constructor() {
    super({
      width: 1024,
      height: 768,
    });
  }

  initialize() {
    super.start().then(() => {
      ground = new Actor({
        x: 0,
        y: 768 - 100,
        width: 1024,
        height: 100,
        color: Color.Green,
        anchor: vec(0, 0),
        body: new Body({
          collider: new Collider({
            shape: Shape.Box(1024, 100),
            type: CollisionType.Fixed,
          }),
        }),
      });

      const player = new Player();

      game.add(ground);
      game.add(player);
    });
  }
}

export const game = new Game();

game.initialize();
