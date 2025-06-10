import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Task } from '../model/task.model';
import { computed } from '@angular/core';

type Filter = 'all' | 'pending' | 'done';

type TasksState = {
  tasks: Task[];
  filter: Filter;
};

const InitialState: TasksState = {
  tasks: [],
  filter: 'all',
};

export const TasksStore = signalStore(
  { providedIn: 'root' },
  withState(InitialState),
  withComputed((state) => ({
    visibleTasks: computed(() => {
      const tasks = state.tasks();
      const filter = state.filter();

      if (filter === 'pending') {
        return tasks.filter((task) => !task.completed);
      }

      if (filter === 'done') {
        return tasks.filter((task) => task.completed);
      }

      return tasks;
    }),
  })),
  withMethods((store) => ({
    changeFilter: (filter: Filter) => {
      patchState(store, {
        filter: filter,
      });
    },

    loadTask: async (tasks: Task[]) => {
      // const service = inject(TasksService);

      // await service.loadTask()

      patchState(store, { tasks });
    },
  }))
);
