export interface MediaItem {
  bildnummer: string;
  suchtext: string;
  fotografen: string;
  datum: string;
}


export interface ProcessedMediaItem extends MediaItem {
  normalizedText: string;
  restrictions: string[];
}