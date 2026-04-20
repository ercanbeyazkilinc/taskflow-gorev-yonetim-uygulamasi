import { useEffect, useState } from 'react';
import { Task, TaskFormValues, TaskPriority, TaskStatus } from '../Interfaces/Task';

interface TaskFormProps {
  editingTask: Task | null;
  onSubmitTask: (values: TaskFormValues) => void;
  onCancelEdit: () => void;
}

const defaultFormValues: TaskFormValues = {
  title: '',
  description: '',
  status: 'Yapılacak',
  priority: 'Orta',
};

const statusOptions: TaskStatus[] = ['Yapılacak', 'Devam Ediyor', 'Tamamlandı'];
const priorityOptions: TaskPriority[] = ['Düşük', 'Orta', 'Yüksek'];

function TaskForm({ editingTask, onSubmitTask, onCancelEdit }: TaskFormProps) {
  const [formValues, setFormValues] = useState<TaskFormValues>(defaultFormValues);

  useEffect(() => {
    if (editingTask) {
      setFormValues({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        priority: editingTask.priority,
      });
      return;
    }

    setFormValues(defaultFormValues);
  }, [editingTask]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitTask({
      ...formValues,
      title: formValues.title.trim(),
      description: formValues.description.trim(),
    });

    if (!editingTask) {
      setFormValues(defaultFormValues);
    }
  };

  return (
    <div className={`panel-card form-panel p-4 ${editingTask ? 'is-editing' : ''}`}>
      <div className="panel-header mb-4">
        <span className="panel-eyebrow">İşlem Merkezi</span>
        <h2 className="section-title h4 mb-1">
          {editingTask ? 'Görevi düzenle' : 'Hızlı görev ekle'}
        </h2>
        <p className="panel-description mb-0">
          Planını net tutmak için görev başlığını, açıklamayı ve önceliği ekle.
        </p>
      </div>

      {editingTask && (
        <div className="edit-banner mb-4">
          <span className="edit-banner-badge">Güncelleme modu</span>
          <div className="edit-banner-text">
            Seçtiğiniz kaydı güncelliyorsunuz. Değişiklikleri kaydedebilir veya iptal edebilirsiniz.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Başlık
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-control"
            placeholder="Örnek: Gün sonu raporunu tamamla"
            value={formValues.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Açıklama
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="form-control"
            placeholder="Görevle ilgili kısa notu veya sonraki adımı yazın"
            value={formValues.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="status" className="form-label">
              Durum
            </label>
            <select
              id="status"
              name="status"
              className="form-select"
              value={formValues.status}
              onChange={handleChange}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="priority" className="form-label">
              Öncelik
            </label>
            <select
              id="priority"
              name="priority"
              className="form-select"
              value={formValues.priority}
              onChange={handleChange}
            >
              {priorityOptions.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions d-flex flex-column flex-sm-row gap-2 mt-4">
          <button type="submit" className="btn btn-primary flex-fill">
            {editingTask ? 'Değişiklikleri kaydet' : 'Görevi kaydet'}
          </button>

          {editingTask && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancelEdit}
            >
              İptal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
