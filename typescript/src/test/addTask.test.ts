import { addTask } from '../commands'

import { describe, it } from 'vitest'
import { Task } from '../Task'

type TestCase = { task: Task }

describe('', () => {
  const testCases: TestCase[] = [{ task: new Task('a testing task') }]

  it.each(testCases)('', ({ task }) => {
    addTask(task)
  })
})
