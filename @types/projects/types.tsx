export interface Iteration {
  index: number;
  elapsedTime: number;
  quality: number;
  notes: string;
  tags: String[];
  startTime: string;
  endTime: Date;
}

export interface Project {
  name: string;
  id: string;
  targetTime?: number;
  targetNumberOfIterations?: number;
  iterations?: Array<Iteration>;
}
