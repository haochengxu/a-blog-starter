import React, { useState } from "react";
import { Project } from "../../../@types/projects/types";

interface Props {
  // Define the props for your component here
  project: Project;
  updateProject: (project: Project) => void;
}

const IterationDetail: React.FC<Props> = ({
  project: currentProject,
  updateProject,
}) => {
  const [timerId, setTimerId] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showPanel, setShowPanel] = useState(false);

  const [startTime, setStartTime] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [rating, setRating] = useState(1);
  const [notes, setNotes] = useState("");

  const startTimer = () => {
    if (timerId !== null) return;
    const id = setInterval(() => {
      setElapsedTime((time) => time + 1);
    }, 1000);
    setTimerId(id);
  };

  const resumeTimer = () => {
    const id = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimerId(id);
  };

  const pauseTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
  };

  const submitIteration = () => {
    if (!window.confirm(`你确定要完成这次${currentProject.name}吗？`)) {
      return;
    }
    const newIteration = {
      startTime: startTime,
      elapsedTime: elapsedTime,
      notes: notes,
      quality: rating,
      tags: [],
    };

    currentProject.iterations = currentProject.iterations ? [...currentProject.iterations, newIteration] : [newIteration];
    updateProject(Object.assign({}, currentProject));
  };

  return (
    <div>
      {currentProject ? (
        <>
          <h3 className="text-2xl font-bold text-blue-600">
            {currentProject && currentProject.name}
          </h3>{" "}
          <div className="summary">
            {currentProject.iterations && (
              <p className="text-zinc-500">
                <span className="pr-5">
                  累积时间：
                  {Math.floor(
                    currentProject.iterations.reduce((prev, iteration) => {
                      return Number(iteration.elapsedTime) + prev;
                    }, 0) / 3600
                  )}
                  小时
                </span>
                <span>
                  累积次数：
                  {currentProject.iterations.length}
                </span>
              </p>
            )}
          </div>
          <button
            className="bg-blue-500 text-white px-4 text-sm py-2 rounded"
            onClick={() => setShowPanel(!showPanel)}
          >
            开始{currentProject.name}
          </button>
          {showPanel && (
            <div className="bg-gray-100 p-4 shadow-lg rounded mt-5">
              <div className="text-zinc-500">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    if (startTime != null) return;
                    setStartTime(new Date().toISOString());
                    startTimer();
                  }}
                >
                  开始计时
                </button>
                {startTime && (
                  <input
                    type="text"
                    readOnly
                    value={startTime.toLocaleString()}
                    className="mt-2 p-1 border rounded"
                  />
                )}
                <button
                  className="ml-5 bg-yellow-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    if (!startTime) return;
                    setIsPaused(!isPaused);
                    if (isPaused) {
                      resumeTimer();
                    } else {
                      pauseTimer();
                    }
                  }}
                >
                  {isPaused ? "恢复" : "暂停"}
                </button>
                <p className="mt-5 mb-5">
                  评分：
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                </p>
                <p className="mt-5 mb-5">
                  笔记：
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2 p-1 border rounded"
                  />
                </p>
                <button
                  className="mt-5 bg-green-500 text-white px-4 py-2 rounded"
                  onClick={submitIteration}
                >
                  完成一次{currentProject.name}
                </button>
                <p>
                  本次累积时间：{Math.floor(elapsedTime / 3600)}小时
                  {Math.floor(elapsedTime / 60) % 60}分钟{elapsedTime % 60}秒
                </p>
              </div>
            </div>
          )}
          {currentProject.iterations &&
            currentProject.iterations.map((iteration, index) => {
              return (
                <div
                  key={index}
                  className="bg-white p-4 shadow rounded mt-5 border-gray-400"
                >
                  <p className="text-lg font-bold text-blue-600">
                    第{index + 1}次{currentProject.name}
                  </p>
                  <p className="text-zinc-500">
                    开始时间:{" "}
                    {iteration.startTime
                      ? `${new Date(iteration.startTime).toLocaleDateString()} ${new Date(iteration.startTime).toLocaleTimeString()}`
                      : "未知"}
                  </p>
                  <p className="text-zinc-500">
                    持续时间: {Math.floor(iteration.elapsedTime / 3600)} 小时{" "}
                    {Math.floor((iteration.elapsedTime % 3600) / 60)} 分钟
                  </p>
                  <p className="text-zinc-500">评价: {iteration.quality}星</p>
                  <p className="text-zinc-500">小记: {iteration.notes}</p>
                </div>
              );
            })}
        </>
      ) : null}
    </div>
  );
};

export default IterationDetail;
