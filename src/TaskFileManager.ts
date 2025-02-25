import { Task } from './Task'

import { join, dirname } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'

export class TaskFileManager {
  private static jsonPath = join(dirname(__dirname), './data/taskList.json')

  static getList(): Task[] {
    if (!existsSync(this.jsonPath)) return []

    const data: Task[] = JSON.parse(readFileSync(this.jsonPath, 'utf8'))

    return data.map((task) => {
      if (task.updatedAt) {
        task.updatedAt = new Date(task.updatedAt)
      }

      task.createdAt = new Date(task.createdAt)

      return task
    })
  }

  static writeList(handle: (data: Task[]) => void): void {
    const data = this.getList()

    handle(data)

    writeFileSync(this.jsonPath, JSON.stringify(data, null, 2))
  }
}
