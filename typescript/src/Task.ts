import { TaskStatus, TASK_STATUS } from './constants'

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
