export interface Media {
  id: string;
  caption: string;
  category: string;
  datePublished: Date;
  permalink: string;
  type: string;
  username: string;
  videoURL?: string;
  dimensions: {
    width: number;
    height: number;
  };
}

export function jsonToMedia(json: any[]): Media[] {
  return json.map((media: any) => ({
    id: media.id,
    caption: media.caption || "Sin descripción",
    category: media.category.toLowerCase(),
    datePublished: new Date(media.timestamp),
    permalink: media.permalink,
    type: media.media_type,
    username: media.username,
    dimensions: media.dimensions,
    videoURL: media.video_url || undefined,
  }));
}

export function getTimeCategory(date: Date): string {
  let now = new Date();
  let diffTime = now.getTime() - date.getTime();
  let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return "Hoy";
  }

  let yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return "Ayer";
  }

  if (diffDays <= 7) return "Última Semana";

  return "Último Mes";
}

export function formatDatetime(then: Date, now: Date = new Date()): string {
  let diffSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  diffSeconds = Math.max(diffSeconds, 0); // Avoid negative values

  if (diffSeconds < 60) {
    return "Hace menos de un minuto";
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    if (diffMinutes === 1) return "Hace 1 minuto";
    return `Hace ${diffMinutes} minutos`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (
    then.getDate() === yesterday.getDate() &&
    then.getMonth() === yesterday.getMonth() &&
    then.getFullYear() === yesterday.getFullYear()
  ) {
    return "Ayer";
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    if (diffHours === 1) return "Hace 1 hora";
    return `Hace ${diffHours} horas`;
  }

  // DD/MM/YYYY
  return then.toLocaleDateString("en-GB");
}
