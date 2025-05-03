export interface EmojiOption {
  id: string;
  symbol: string;
  label: string;
}

export const EMOJI_OPTIONS: EmojiOption[] = [
  { id: 'beach', symbol: '🏖️', label: 'Beach' },
  { id: 'mountain', symbol: '🏔️', label: 'Mountain' },
  { id: 'city', symbol: '🌆', label: 'City' },
  { id: 'island', symbol: '🏝️', label: 'Island' },
  { id: 'map', symbol: '🗺️', label: 'Map' },
  { id: 'plane', symbol: '✈️', label: 'Airplane' },
  { id: 'train', symbol: '🚞', label: 'Train' },
  { id: 'car', symbol: '🚗', label: 'Car' },
  { id: 'camera', symbol: '📸', label: 'Camera' },
  { id: 'party', symbol: '🎉', label: 'Party' },
];
