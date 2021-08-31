document.getElementById('viewport').addEventListener('mousemove', (e) => {
    cursor.setInputValue("x", e.offsetX);
    cursor.setInputValue("y", e.offsetY);
})

const cursor = new Cursor();

export function cursorCoordinates() {
    return cursor.coordinates
}

function Cursor() {
    this.coordinates = {};
    this.setInputValue = function (name, val) {
        this.coordinates[name] = val;
    };

    this.getInputValue = function (n) {
        return this.coordinates[n];
    }

}