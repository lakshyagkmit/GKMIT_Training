// Child process code
process.on('message', (message) => {
  const { matrix, columnIndex } = message;

  const columnData = matrix.map(row => row[columnIndex]);

  process.send(columnData);
});
