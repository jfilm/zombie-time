export class Entity {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  

  update() {
    this.x  = this.x + this.velocity.x;
    this.y  = this.y + this.velocity.y;
  }

  setVelocity(x = 0, y = 0) {
    this.velocity = {
        x,
        y
    };
  }
}