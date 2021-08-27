import { Point2d } from "./Point2d";

export class Entity {
  constructor(position, radius, color, speed = 1, attack = 10, health = 10) {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.velocity = new Point2d;
    this.hp = health;
    this.invincible = false;
  }

  get x() {
    return this.position.x;
  }

  set x(x) {
    this.position.x = x;
  }

  get y() {
    return this.position.y;
  }

  set y(y) {
    this.position.y = y;
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

  /// Returns true if the entities are colliding, else false
  collidesWith(entity) {
    const dx = Math.abs(entity.x - this.x);
    const dy = Math.abs(entity.y - this.y);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const combinedRadii = this.radius + entity.radius;

    return (combinedRadii > distance);
  }

  takeDamage(damage) {
    if (!this.invincible) {
      this.hp -= damage;
      this.hp = Math.max(this.hp, 0);

      // Turn on "invincibility frames"
      this.invincible = true;
      const originalColor = this.color;
      this.color = "red";

      // Turn off "invincibility frames"
      setTimeout(() => {
        this.invincible = false;
        this.color = originalColor;
      }, 500);
    }
  }
}