// export interface MediaItem {
//   bildnummer: string;
//   suchtext: string;
//   fotografen: string;
//   datum: string;
// }

export interface ProcessedMediaItem {
  id: number;
  suchtext: string;
  bildnummer: string;
  fotografen: string;
  datum: string;
  
  normalizedText: string;
  restrictions: string[];
}