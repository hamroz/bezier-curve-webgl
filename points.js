function main() {
  var canvas = document.getElementById("webgl");

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }

  if (!initShaders(gl, vshader(), fshader())) {
    console.log("Failed to intialize shaders.");
    return;
  }

  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed to get the storage location of a_Position");
    return;
  }

  initEventHandlers(canvas, gl, a_Position);

  gl.clearColor(0.88, 0.898, 0.921, 1.0);

  D_Dots(gl, a_Position);
}

var G_Pnt = [];

function initEventHandlers(canvas, gl, a_Position) {
  var DRG = false;

  var X = -1,
    Y = -1;

  var Indx = 0;

  canvas.onmousedown = function (ev) {
    var x = ev.clientX,
      y = ev.clientY;

    var rectangle = ev.target.getBoundingClientRect();
    if (
      rectangle.left <= x &&
      x < rectangle.right &&
      rectangle.top <= y &&
      y < rectangle.bottom
    ) {
      X = x;
      Y = y;
      M_Coords_X = (X - 250) / 250;
      M_Coords_Y = (-1 * (Y - 250)) / 250;
      for (var i = 0; i < G_Points.length; i++) {
        if (
          G_Points[i][0] - 0.05 <= M_Coords_X &&
          M_Coords_X <= G_Points[i][0] + 0.05 &&
          G_Points[i][1] - 0.05 <= M_Coords_Y &&
          M_Coords_Y <= G_Points[i][1] + 0.05
        ) {
          Indx = i;
        }
      }
      DRG = true;
    }
  };

  canvas.onmouseup = function (ev) {
    DRG = false;
  };

  canvas.onmousemove = function (ev) {
    var x = ev.clientX,
      y = ev.clientY;
    if (DRG) {
      M_Coords_X = (x - 250) / 250;
      M_Coords_Y = (-1 * (y - 250)) / 250;

      Prev_Coords = G_Points[Indx];
      New_Coords = [M_Coords_X, M_Coords_Y];
      Coords_Modify = [
        New_Coords[0] - Prev_Coords[0],
        New_Coords[1] - Prev_Coords[1],
      ];

      G_Points[Indx] = [M_Coords_X, M_Coords_Y];
      G_Points[Indx] = [M_Coords_X, M_Coords_Y];

      if (Indx % 3 == 0 && Indx != 0 && Indx != G_Points.length - 1) {
        G_Points[Indx + 1][0] += Coords_Modify[0];
        G_Points[Indx + 1][1] += Coords_Modify[1];

        G_Points[Indx - 1][0] += Coords_Modify[0];
        G_Points[Indx - 1][1] += Coords_Modify[1];
        console.log("joint", G_Points.length);
      }

      if (
        (Indx + 1) % 3 == 0 &&
        Indx != 0 &&
        Indx != G_Points.length - 2 &&
        Indx != G_Points.length - 1
      ) {
        G_Points[Indx + 2][0] += -Coords_Modify[0];
        G_Points[Indx + 2][1] += -Coords_Modify[1];

        console.log("before");
      }
      if (
        (Indx - 1) % 3 == 0 &&
        Indx != 0 &&
        Indx != 1 &&
        Indx != G_Points.length - 1
      ) {
        G_Points[Indx - 2][0] += -Coords_Modify[0];
        G_Points[Indx - 2][1] += -Coords_Modify[1];

        console.log("after");
      }

      D_Dots(gl, a_Position);
    }
    (X = x), (Y = y);
  };
}
