function xCoords(G_Points, Point_Curr, zs, Ind_Curr) {
  x =
    (-1 * zs ** 3 + 3 * zs ** 2 - 3 * zs + 1) * Point_Curr[0] +
    (3 * zs ** 3 - 6 * zs ** 2 + 3 * zs) * G_Points[Ind_Curr + 1][0] +
    (-3 * zs ** 3 + 3 * zs ** 2) * G_Points[Ind_Curr + 2][0] +
    zs ** 3 * G_Points[Ind_Curr + 3][0];

  return x;
}

function yCoords(G_Points, Point_Curr, zs, Ind_Curr) {
  y =
    (-1 * zs ** 3 + 3 * zs ** 2 - 3 * zs + 1) * Point_Curr[1] +
    (3 * zs ** 3 - 6 * zs ** 2 + 3 * zs) * G_Points[Ind_Curr + 1][1] +
    (-3 * zs ** 3 + 3 * zs ** 2) * G_Points[Ind_Curr + 2][1] +
    zs ** 3 * G_Points[Ind_Curr + 3][1];

  return y;
}
