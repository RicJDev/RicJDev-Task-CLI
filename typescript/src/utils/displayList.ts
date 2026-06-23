import { Task } from '../Task'

export function displayList(data: Task[]) {
  if (data.length == 0) {
    console.log('No task to display')
    return
  }

  data.forEach(({ id, description, status, createdAt, updatedAt }) => {
    console.log(`[ID: ${id}]. ${createdAt.toLocaleString()}
  (${status}): ${description}`)
  })
}
