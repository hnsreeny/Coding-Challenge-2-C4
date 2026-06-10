import seedData from "@/data/seed.json";

import {
  normalizeText,
  extractRestrictions,
} from "./preprocess";

export const mediaItems = seedData.map(
  (item) => ({
    ...item,

    normalizedText: normalizeText(
      `${item.suchtext} ${item.fotografen}`
    ),

    restrictions: extractRestrictions(
      item.suchtext
    ),
  })
);