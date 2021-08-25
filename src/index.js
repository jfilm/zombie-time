const viewport = document.getElementById("viewport");
const ctx = viewport.getContext("2d");

const viewportWidth = viewport.width;
const viewportHeight = viewport.height;

const viewportScale = window.devicePixelRatio || 1;

viewport.width = viewportScale * viewportWidth;
viewport.height = viewportHeight * viewportScale;

viewport.style.width = viewportWidth + 'px';
viewport.style.height = viewportHeight + 'px';

ctx.scale(viewportScale, viewportScale);

