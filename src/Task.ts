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

export class Task {
  id: number
  description: string
  status: TaskStatus
  createdAt: Date
  updatedAt?: Date

  constructor(description: string) {
    this.description = description
    this.status = TASK_STATUS.TODO
    this.createdAt = new Date()
    this.id = 0
  }
}
