interface HeaderProps {
  totalCount: number;
  completedCount: number;
  ongoingCount: number;
  pendingCount: number;
}

function Header({
  totalCount,
  completedCount,
  ongoingCount,
  pendingCount,
}: HeaderProps) {
  return (
    <header className="app-header panel-card mb-4">
      <div className="row g-3 align-items-center">
        <div className="col-xl-6">
          <div className="app-brand-wrap">
            <div className="brand-mark">TF</div>
            <div className="app-brand-copy">
              <span className="app-badge">TaskFlow</span>
              <h1 className="app-title mb-1">Gününü planla, önceliğini koru.</h1>
              <p className="app-subtitle mb-0">
                Günlük görevlerini, önceliklerini ve ilerleyen işlerini tek panelde yönet.
              </p>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="row g-3">
            <div className="col-sm-6">
              <div className="metric-card metric-card-total">
                <div className="metric-label">Aktif Görevler</div>
                <div className="stat-value">{totalCount}</div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="metric-card metric-card-pending">
                <div className="metric-label">Yapılacaklar</div>
                <div className="stat-value">{pendingCount}</div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="metric-card metric-card-ongoing">
                <div className="metric-label">Devam Edenler</div>
                <div className="stat-value">{ongoingCount}</div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="metric-card metric-card-completed">
                <div className="metric-label">Tamamlananlar</div>
                <div className="stat-value">{completedCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
