function vshader() {
  var VSHADER_SOURCE =
    "attribute vec4 a_Position;\n" +
    "void main() {\n" +
    "  gl_PointSize = 10.0;\n" +
    "  gl_Position = a_Position;\n" +
    "}\n";

  return VSHADER_SOURCE;
}

function fshader() {
  var FSHADER_SOURCE =
    "precision mediump float;\n" +
    "uniform vec4 u_FragColor;\n" + //
    "void main() {\n" +
    "  gl_FragColor = u_FragColor;\n" +
    "}\n";

  return FSHADER_SOURCE;
}

var Q_Points = [
  [0.57, -0.48],
  [0.89, -0.18],
  [0.85, 0.29],
  [0.74, 0.32],
  [0.62, 0.33],
  [0.43, 0.35],
  [0.37, 0.07],
  [0.32, -0.19],
  [0.14, -0.18],
  [0.2, -0.18],
  [-0.08, -0.18],
  [-0.25, 0.04],
  [-0.33, 0.07],
  [-0.43, 0.17],
  [-0.56, 0.44],
  [-0.68, 0.44],
  [-0.8, 0.44],
  [-0.83, -0.13],
  [-0.48, -0.38],
];

function D_Dots(gl, a_Position) {
  var xs = [];
  var ys = [];
  var xys = [];
  var s = 0.01;
  zs = 0;

  gl.clear(gl.COLOR_BUFFER_BIT);

  Point_Curr = Q_Points[0];
  Ind_Curr = 0;
  for (i = 0; i <= Q_Points.length / 4 + 1; i++) {
    Ind_Curr = i * 3;
    while (zs <= 1) {
      x = xCoords(Q_Points, Point_Curr, zs, Ind_Curr);
      y = yCoords(Q_Points, Point_Curr, zs, Ind_Curr);
      console.log(y);
      xs.push(x);
      ys.push(y);
      xys.push(x);
      xys.push(y);
      zs += s;
    }
    zs = 0;
    Point_Curr = Q_Points[Ind_Curr + 3];
  }

  G_Lines = [];
  for (var i = 0; i < Q_Points.length; i += 1) {
    G_Lines.push(Q_Points[i][0]);
    G_Lines.push(Q_Points[i][1]);
  }

  var vertices = new Float32Array(xys);
  var n = xys.length / 2;

  var lines = new Float32Array(G_Lines);
  var line_N = G_Lines.length / 2;

  line(gl, lines, a_Position, line_N);

  bezier_curve(gl, vertices, a_Position, n);

  C_Dots(gl, lines, a_Position, line_N);
}
