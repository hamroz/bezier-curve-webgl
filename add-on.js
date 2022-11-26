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

var G_Points = [
  [-0.5, -0.4],
  [-0.85, -0.15],
  [-0.82, 0.42],
  [-0.7, 0.42],
  [-0.58, 0.42],
  [-0.45, 0.15],
  [-0.35, 0.05],
  [-0.27, 0.02],
  [-0.1, -0.2],
  [0, -0.2],
  [0.12, -0.2],
  [0.3, -0.21],
  [0.35, 0.05],
  [0.41, 0.33],
  [0.6, 0.31],
  [0.72, 0.3],
  [0.83, 0.27],
  [0.87, -0.2],
  [0.55, -0.5],
];

// var G_Points = [
//   [-0.52, -0.42],
//   [-0.87, -0.17],
//   [-0.84, 0.4],
//   [-0.72, 0.4],
//   [-0.6, 0.4],
//   [-0.47, 0.13],
//   [-0.37, 0.02],
//   [-0.29, 0],
//   [-0.12, -0.22],
//   [-0.8, -0.4],
//   [0.1, -0.4],
//   [0.1, -0.23],
//   [0.33, 0.02],
//   [0.39, 0.31],
//   [0.4, 0.29],
//   [0.7, 0.1],
//   [0.81, 0.25],
//   [0.85, -0.4],
//   [0.53, -0.7],
// ];

function D_Dots(gl, a_Position) {
  var ArrNew = [];

  var xs = [];
  var ys = [];
  var xys = [];
  var s = 0.01;
  zs = 0;

  G_Points.forEach((PNT) => {
    ArrNew.push(PNT[0]);
    ArrNew.push(PNT[1]);
  });

  G_Pnt = ArrNew;

  gl.clear(gl.COLOR_BUFFER_BIT);

  Point_Curr = G_Points[0];
  Ind_Curr = 0;
  for (i = 0; i <= G_Points.length / 4 + 1; i++) {
    Ind_Curr = i * 3;
    while (zs <= 1) {
      x = xCoords(G_Points, Point_Curr, zs, Ind_Curr);
      y = yCoords(G_Points, Point_Curr, zs, Ind_Curr);
      console.log(y);
      xs.push(x);
      ys.push(y);
      xys.push(x);
      xys.push(y);
      zs += s;
    }
    zs = 0;
    Point_Curr = G_Points[Ind_Curr + 3];
  }

  G_Lines = [];
  for (var i = 0; i < G_Points.length; i += 1) {
    G_Lines.push(G_Points[i][0]);
    G_Lines.push(G_Points[i][1]);
  }

  var vertices = new Float32Array(xys);
  var n = xys.length / 2;

  var lines = new Float32Array(G_Lines);
  var line_N = G_Lines.length / 2;

  line(gl, lines, a_Position, line_N);

  bezier_curve(gl, vertices, a_Position, n);

  C_Dots(gl, lines, a_Position, line_N);
}
