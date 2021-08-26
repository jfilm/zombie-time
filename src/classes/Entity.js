export class Entity {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.hp = 10;
    this.invincible = false;
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