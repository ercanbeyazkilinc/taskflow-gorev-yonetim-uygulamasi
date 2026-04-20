import { Task } from '../Interfaces/Task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityClasses: Record<Task['priority'], string> = {
  Düşük: 'bg-success-subtle text-success',
  Orta: 'bg-warning-subtle text-warning-emphasis',
  Yüksek: 'bg-danger-subtle text-danger',
};

const statusClasses: Record<Task['status'], string> = {
  Yapılacak: 'bg-secondary-subtle text-secondary-emphasis',
  'Devam Ediyor': 'bg-info-subtle text-info-emphasis',
  Tamamlandı: 'bg-success-subtle text-success',
};

function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const formattedDate = new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(task.createdAt));

  return (
    <article className="task-card p-4">
      <div className="task-card-head mb-3">
        <div className="task-main">
          <div className="task-meta-row mb-2">
            <span className="task-id-badge">#{task.id.slice(0, 8)}</span>
            <small className="task-date">Oluşturulma: {formattedDate}</small>
          </div>

          <h3 className="task-title mb-2">{task.title}</h3>
          <p className="task-description mb-0">{task.description}</p>
        </div>

        <span className={`badge status-pill px-3 py-2 ${statusClasses[task.status]}`}>
          {task.status}
        </span>
      </div>

      <div className="task-card-info mb-3">
        <div className="task-info-label">Öncelik durumu</div>
        <span className={`badge priority-pill px-3 py-2 ${priorityClasses[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <div className="task-footer d-flex justify-content-between align-items-center gap-2">
        <div className="task-footer-note">Kaydı düzenleyin veya listeden kaldırın.</div>

        <div className="d-flex gap-2 task-actions">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(task)}
          >
            Düzenle
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(task.id)}
          >
            Sil
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
