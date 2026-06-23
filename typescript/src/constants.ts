export const TASK_STATUS = {
  TODO: 'to-do',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
} as const

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]

export const TASK_RULES: { [key in TaskStatus]?: TaskStatus } = {
  [TASK_STATUS.TODO]: TASK_STATUS.IN_PROGRESS,
  [TASK_STATUS.IN_PROGRESS]: TASK_STATUS.DONE,
} as const
