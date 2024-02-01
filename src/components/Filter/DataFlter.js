export const languages = [
  { value: '', label: 'Any' },
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Mandarin Chinese', label: 'Mandarin Chinese' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Vietnamese', label: 'Vietnamese' },
];

export const levels = [
  { value: 'A1 Beginner', label: 'A1 Beginner' },
  { value: 'A2 Elementary', label: 'A2 Elementary' },
  { value: 'B1 Intermediate', label: 'B1 Intermediate' },
  { value: 'B2 Upper-Intermediate', label: 'B2 Upper-Intermediate' },
  { value: 'C1 Advanced', label: 'C1 Advanced' },
  { value: 'C2 Proficient', label: 'C2 Proficient' },
];

export const prices = [
  { value: '', label: 'Any' },
  ...Array.from({ length: 11 }, (_, i) => i + 25).map((price, i) => ({
    value: price,
    label: `${price} $`,
  })),
];

