const { fork } = require('child_process');

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Function to fork child processes and assign tasks
function parallelColumnExtraction(matrix) {
  const numColumns = matrix[0].length;
  const results = [];

  // Spawn child processes, one for each column
  for (let col = 0; col < numColumns; col++) {
    const child = fork('./child.js'); 

    child.send({ matrix, columnIndex: col });

    child.on('message', (data) => {
      console.log(`Received from child ${col}:`, data);

      results[col] = data;

      if (results.filter(Boolean).length === numColumns) {
        console.log('Final Result:', results);
      }
    });
  }
}

parallelColumnExtraction(matrix);