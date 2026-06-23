import { Task } from './Task'
import { TaskStatus, TASK_RULES } from './constants'
import { TaskFileManager } from './TaskFileManager'
import { displayList } from './utils/displayList'

export function getLastId(): number {
  const data = TaskFileManager.getList()

  return data.reduce((acc, { id }) => Math.max(acc, id), 0) + 1
}

export function addTask(task: Task): void {
  task.id = getLastId()
  TaskFileManager.writeList((data) => data.push(task))
  console.log(`Task added succesfully (ID: ${task.id})! 😎`)
}

export function updateTask(id: number, description: string): void {
  TaskFileManager.writeList((data) => {
    const targetTask = data.find(({ id: target }) => id == target)

    if (!targetTask) {
      console.log(`Not found. Check your id ${id}`)
      return
    }

    targetTask.description = description
    targetTask.updatedAt = new Date()

    console.log(`(ID: ${id}): Task updated succesfully! 😄`)
  })
}

export function markTaskStatus(id: number, status: TaskStatus): void {
  TaskFileManager.writeList((data) => {
    const targetTask = data.find(({ id: target }) => target == id)

    if (!targetTask) {
      console.log(`Not found. Check your id: ${id}`)
      return
    }

    if (status !== TASK_RULES[targetTask.status]) {
      console.log(`Invalid status setting. Cannot set ${targetTask.status} to ${status}`)
      return
    }

    targetTask.status = status
    targetTask.updatedAt = new Date()

    console.log(`(ID: ${id}): Task have been marked as "${status}"!`)
  })
}

export function deleteTask(id: number): void {
  TaskFileManager.writeList((data) => {
    const index = data.findIndex(({ id: target }) => target == id)

    if (index < 0) {
      console.log(`Not found. Check your id: ${id}`)
      return
    }

    data.splice(index, 1)

    console.log(`(ID: ${id}): Task updated succesfully! 😄`)
  })
}

export function deleteAllTask(): void {
  TaskFileManager.writeList((data) => (data.length = 0))
}

export function listTask(filter: TaskStatus) {
  const data = TaskFileManager.getList()

  if (!filter) {
    displayList(data)
    return
  }

  displayList(data.filter(({ status }) => status == filter))
}
