

/// Not an entity, but used by them
export class Point2d {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /// How far from (0, 0) the point is
  get magnitude() {
    // Pythagoras bless
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /// returns new Point with magnitude 1
  normal() {
    const x = this.x / this.magnitude;
    const y = this.y / this.magnitude;
    return new Point2d(x, y);
  }

  /// returns new Point with magnitude n times larger
  scale(n) {
    const x = this.x * n;
    const y = this.y * n;
    return new Point2d(x, y);
  }

  /// returns new Point with x = this.x + other.x and y = this.y + other.y
  add(otherPos) {
    const x = this.x + otherPos.x;
    const y = this.y + otherPos.y;

    return new Point2d(x, y);
  }
}