class Car {
  constructor(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.speed = 0;
    this.acceleration = 0.3;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;
    this.controls = new VehicleControls();
  }

  update() {
    this.#move();
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    // rotate the car
    ctx.rotate(-this.angle);
    ctx.beginPath();
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    ctx.restore();
  }

  #move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    // Here car is reversing, hence capping the max speed to half
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    // stop the card from doing a G turn (unless it's g wagon)
    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1;
      // multiplied by the flip because if speed is negative it should turn card how a real car turns
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    this.y -= Math.cos(this.angle) * this.speed;
    this.x -= Math.sin(this.angle) * this.speed;
  }
}
