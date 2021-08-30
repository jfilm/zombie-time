import { Point2d } from "./Point2d";

export class Entity {
  constructor(position, radius, color, speed = 1, attack = 10, health = 10, img) {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.velocity = new Point2d;
    this.attack = attack;
    this.hp = health;
    this.img = img;
    this.direction = 0;
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

  //If this.img is defined then it will draw and image otherwise it will be filled with this.color 
  draw(ctx) {
    if (this.img) {
      // const width = this.img.width;
      // const height = this.img.height;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.direction);
      ctx.drawImage(this.img, -this.radius / 2, -this.radius / 2, this.radius, this.radius);
      ctx.rotate(- this.direction);
      ctx.translate(-this.x, -this.y);
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

  }

  update() {
    this.position = this.position.add(this.velocity);
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
    this.hp -= damage;
  }
}