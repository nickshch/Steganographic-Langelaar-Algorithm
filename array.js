Array.matrix = function(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
}

Array.matrix.zeros = function(matrix, size) {
  result = 0;
  for (var i = 0; i < size; i++)
      for (var j = 0; j < size; j++)
          if (matrix[i][j] == 0) result++;
  return result;
}
