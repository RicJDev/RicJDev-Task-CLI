#!/usr/bin/env node

import * as readline from 'readline/promises'

import { Command } from 'commander'
import { Task } from './Task'
import { TASK_STATUS, TaskStatus } from './constants'
import { addTask, updateTask, deleteTask, deleteAllTask, markTaskStatus, listTask } from './commands'

const program = new Command('task-cli')

program
  .command('add')
  .argument('<description>')
  .action((description: string) => {
    const task = new Task(description)

    addTask(task)
  })

program
  .command('update')
  .argument('<id>')
  .argument('<description>')
  .action((idString: string, description: string) => {
    const id: number = parseInt(idString)

    if (isNaN(id)) {
      console.log("Invalid argument. Id's are numbers")
      return
    }

    updateTask(id, description)
  })

type DeleteOptions = {
  all: boolean
}

program
  .command('delete')
  .argument('[id]')
  .option('--all')
  .action(async (idString, { all }: DeleteOptions) => {
    if (all) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      const response = await rl.question('Are you sure? This gonna delete all tasks! 😨 ')

      if (/y.s|y.p|y/gi.test(response)) {
        deleteAllTask()

        console.log('All tasks have been deleted. 😵')
      } else {
        console.log('Great decision. 😉')
      }

      rl.close()
      return
    }

    const id: number = Number(idString)

    if (isNaN(id)) {
      console.log("Invalid argument. Id's are numbers")
      return
    }

    deleteTask(id)
  })

program
  .command('mark-in-progress')
  .argument('<id>')
  .action((idString) => {
    const id: number = Number(idString)

    if (isNaN(id)) {
      console.log("Invalid argument. Id's are numbers")
      return
    }

    markTaskStatus(id, TASK_STATUS.IN_PROGRESS)
  })

program
  .command('mark-done')
  .argument('<id>')
  .action((idString) => {
    const id: number = Number(idString)

    if (isNaN(id)) {
      console.log("Invalid argument. Id's are numbers")
      return
    }

    markTaskStatus(id, TASK_STATUS.DONE)
  })

program
  .command('list')
  .argument('[filter]')
  .action((filter: TaskStatus) => {
    if (filter && !Object.values(TASK_STATUS).includes(filter)) {
      console.log(`Invalid status. Try with "${TASK_STATUS.TODO}", "${TASK_STATUS.IN_PROGRESS}", "${TASK_STATUS.DONE}"`)
      return
    }

    listTask(filter)
  })

program.parse(process.argv)
