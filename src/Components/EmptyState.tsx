function EmptyState() {
  return (
    <div className="empty-state text-center p-4 p-lg-5">
      <div className="empty-state-orbit mx-auto mb-3" />
      <span className="empty-state-kicker">TaskFlow Hazır</span>
      <h3 className="h4 mb-3">Henüz görev yok, ilk kaydınla akışı başlat</h3>
      <p className="text-secondary mb-0">
        Sol panelden yeni bir görev oluşturun veya arama ve filtre alanlarını kullanarak
        mevcut kayıtlarınızı görünür hale getirin.
      </p>
    </div>
  );
}

export default EmptyState;
