# Görev Yönetim Uygulaması

## Proje Amacı
Bu proje, React ve TypeScript kullanılarak geliştirilmiş bir görev yönetim uygulamasıdır. Uygulama üzerinden görev ekleme, listeleme, güncelleme ve silme işlemleri yapılabilir. Tüm veriler tarayıcıdaki `localStorage` alanında saklanır.

## Kullanılan Teknolojiler
- Vite
- React
- TypeScript
- Bootstrap 5
- localStorage

## Özellikler
- Yeni görev ekleme
- Kayıtlı görevleri listeleme
- Mevcut görevi düzenleme
- Görev silme ve onay kutusu
- Duruma göre filtreleme
- Başlık veya açıklamaya göre arama
- Boş liste durumu için kullanıcı dostu mesaj
- Mobil ve masaüstü uyumlu arayüz

## Kurulum Adımları
1. Proje klasörüne girin.
2. Bağımlılıkları kurun:

```bash
npm install
```

## Çalıştırma Komutları
Gelişim ortamı için:

```bash
npm run dev
```

Tarayıcıda açılan yerel adres üzerinden uygulamayı kullanabilirsiniz.

## Build Alma Komutu
Üretim için build almak için:

```bash
npm run build
```

İsterseniz build sonrası ön izleme için şu komutu kullanabilirsiniz:

```bash
npm run preview
```

## Netlify Deploy İçin Kısa Not
- Projeyi GitHub'a yükledikten sonra Netlify üzerinden yeni site oluşturabilirsiniz.
- Build command: `npm run build`
- Publish directory: `dist`
- Netlify, Vite projelerinde build sonrası `dist` klasörünü yayınlar.

## Klasör Yapısı Özeti
```text
src
|-- Components
|   |-- EmptyState.tsx
|   |-- Header.tsx
|   |-- TaskCard.tsx
|   |-- TaskForm.tsx
|   |-- TaskList.tsx
|-- Interfaces
|   |-- Task.ts
|-- Pages
|   |-- HomePage.tsx
|-- utils
|   |-- storage.ts
|-- App.tsx
|-- index.css
|-- main.tsx
```

## CRUD İşlemlerinin Nerede Olduğu
- Ekleme ve güncelleme işlemleri: `src/Components/TaskForm.tsx` formu ve `src/Pages/HomePage.tsx` içindeki `handleSubmitTask`
- Listeleme işlemi: `src/Components/TaskList.tsx` ve `src/Components/TaskCard.tsx`
- Silme işlemi: `src/Pages/HomePage.tsx` içindeki `handleDeleteTask`
- localStorage kaydetme ve okuma işlemleri: `src/utils/storage.ts`

## localStorage Anahtarı
Uygulama görevleri `task-manager-items` anahtarı ile saklanır.
