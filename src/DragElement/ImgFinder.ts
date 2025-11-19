export interface ImgFinder {
  id: number;
  img: string;
}

export const imgOfGods: ImgFinder[] = [
  ...Array.from({ length: 106 }, (_, i) => ({
    id: i + 1,
    img: `./images/image${i + 1}.jpg`,
  }))
];
