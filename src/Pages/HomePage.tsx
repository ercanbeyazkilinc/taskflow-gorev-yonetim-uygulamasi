import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import TaskForm from '../Components/TaskForm';
import TaskList from '../Components/TaskList';
import { Task, TaskFormValues, TaskStatus } from '../Interfaces/Task';
import { getTasksFromStorage, saveTasksToStorage } from '../utils/storage';

const allStatusOptions: Array<TaskStatus | 'Tümü'> = [
  'Tümü',
  'Yapılacak',
  'Devam Ediyor',
  'Tamamlandı',
];

const createTaskId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(() =>
    getTasksFromStorage().sort(
      (firstTask, secondTask) =>
        new Date(secondTask.createdAt).getTime() -
        new Date(firstTask.createdAt).getTime(),
    ),
  );
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'Tümü'>('Tümü');

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const lowerSearchTerm = searchTerm.trim().toLocaleLowerCase('tr-TR');

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'Tümü' || task.status === statusFilter;

    const matchesSearch =
      lowerSearchTerm.length === 0 ||
      task.title.toLocaleLowerCase('tr-TR').includes(lowerSearchTerm) ||
      task.description.toLocaleLowerCase('tr-TR').includes(lowerSearchTerm);

    return matchesStatus && matchesSearch;
  });

  const handleSubmitTask = (values: TaskFormValues) => {
    if (!values.title || !values.description) {
      return;
    }

    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks
          .map((task) =>
            task.id === editingTask.id
              ? { ...task, ...values }
              : task,
          )
          .sort(
            (firstTask, secondTask) =>
              new Date(secondTask.createdAt).getTime() -
              new Date(firstTask.createdAt).getTime(),
          ),
      );
      setEditingTask(null);
      return;
    }

    const newTask: Task = {
      id: createTaskId(),
      createdAt: new Date().toISOString(),
      ...values,
    };

    setTasks((currentTasks) =>
      [newTask, ...currentTasks].sort(
        (firstTask, secondTask) =>
          new Date(secondTask.createdAt).getTime() -
          new Date(firstTask.createdAt).getTime(),
      ),
    );
  };

  const handleDeleteTask = (taskId: string) => {
    const selectedTask = tasks.find((task) => task.id === taskId);

    if (!selectedTask) {
      return;
    }

    const confirmed = window.confirm(
      `"${selectedTask.title}" görevini silmek istediğinize emin misiniz?`,
    );

    if (!confirmed) {
      return;
    }

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));

    if (editingTask?.id === taskId) {
      setEditingTask(null);
    }
  };

  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.status === 'Tamamlandı').length;
  const ongoingCount = tasks.filter((task) => task.status === 'Devam Ediyor').length;
  const pendingCount = tasks.filter((task) => task.status === 'Yapılacak').length;

  return (
    <main className="app-shell">
      <div className="container-xxl app-container">
        <Header
          totalCount={totalCount}
          completedCount={completedCount}
          ongoingCount={ongoingCount}
          pendingCount={pendingCount}
        />

        <div className="row g-4 align-items-start">
          <div className="col-lg-4 col-xl-4">
            <TaskForm
              editingTask={editingTask}
              onSubmitTask={handleSubmitTask}
              onCancelEdit={() => setEditingTask(null)}
            />
          </div>

          <div className="col-lg-8 col-xl-8">
            <section className="panel-card list-panel p-4 h-100">
              <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3 mb-4">
                <div>
                  <span className="panel-eyebrow">Aktif Görevler</span>
                  <h2 className="section-title h4 mb-1">Görev listesi</h2>
                  <p className="panel-description mb-0">
                    Kayıtlarını tek panelde ara, filtrele ve düzenli biçimde takip et.
                  </p>
                </div>

                <div className="results-chip">Görünen kayıt: {filteredTasks.length}</div>
              </div>

              <div className="filter-toolbar row g-3 mb-4">
                <div className="col-md-7">
                  <label htmlFor="searchTerm" className="form-label">
                    Görevlerini ara
                  </label>
                  <input
                    id="searchTerm"
                    type="text"
                    className="form-control"
                    placeholder="Başlık veya açıklamaya göre ara"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="statusFilter" className="form-label">
                    Durum filtresi
                  </label>
                  <select
                    id="statusFilter"
                    className="form-select"
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value as TaskStatus | 'Tümü')
                    }
                  >
                    {allStatusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <TaskList
                tasks={filteredTasks}
                onEditTask={setEditingTask}
                onDeleteTask={handleDeleteTask}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
