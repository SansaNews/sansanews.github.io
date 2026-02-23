export interface Media {
  caption: string;
  category: string;
  children: boolean;
  datePublished: Date;
  permalink: string;
  profileLink: string;
  profilePicture: string;
  type: string;
  url: string;
  username: string;
}

export function jsonToMedia(json: any[]): Media[] {
  return json.map((media: any) => ({
    caption: media.caption || "Sin descripción",
    category: media.category.toLowerCase(),
    children: media.children,
    datePublished: new Date(media.timestamp),
    permalink: media.permalink,
    profileLink: "https://www.instagram.com/" + media.username,
    profilePicture: media.profile_picture_url,
    type: media.media_type,
    url: media.media_url,
    username: media.username,
  }));
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

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    if (diffHours === 1) return "Hace 1 hora";
    return `Hace ${diffHours} horas`;
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

  // DD/MM/YYYY
  return then.toLocaleDateString("en-GB");
}
