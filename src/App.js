import React, { useState, useEffect } from 'react';
import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

const ProcessStack = () => {
  const [processes, setProcesses] = useState([]);
  const [currentProcess, setCurrentProcess] = useState(null);

  useEffect(() => {
    if (currentProcess) {
      const timeoutId = setTimeout(() => {
        finishProcess();
      }, currentProcess.duration * 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [currentProcess]);

  const addProcess = (name, duration) => {
    const newProcess = { name, duration, remainingTime: duration };
    setProcesses([...processes, newProcess]);
    if (!currentProcess) {
      setCurrentProcess(newProcess);
    }
  };

  const finishProcess = () => {
    setCurrentProcess(null);
  };

  const getTotalDuration = () => {
    return processes.reduce((total, process) => total + process.duration, 0);
  };

  const ganttData = processes.map((process, index) => ({
    name: process.name,
    start: index,
    end: index + process.duration,
  }));

  return (
    <div>
      <h2>Process Stack</h2>
      <ul>
        {processes.map((process, index) => (
          <li key={index}>
            {process.name} - Remaining time: {process.remainingTime}
          </li>
        ))}
      </ul>
      {currentProcess && (
        <div>
          <h3>Executing: {currentProcess.name}</h3>
          <p>Remaining time: {currentProcess.remainingTime}</p>
        </div>
      )}

      <h3>Gantt Chart</h3>
      <BarChart width={600} height={300} data={ganttData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 'dataMax']} />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="start" stackId="a" fill="#8884d8" />
        <Bar dataKey="end" stackId="a" fill="#82ca9d" />
        <ReferenceLine x={0} stroke="#999999" />
      </BarChart>

      <p>Total Duration: {getTotalDuration()} seconds</p>

      <button onClick={() => addProcess('Process 1', 5)}>Add Process 1</button>
      <button onClick={() => addProcess('Process 2', 3)}>Add Process 2</button>
      <button onClick={() => addProcess('Process 3', 8)}>Add Process 3</button>
    </div>
  );
};

export default ProcessStack;