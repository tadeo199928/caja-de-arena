export interface ImgRender {
  id: number;
  img: string;
}

export const imgOfGods: ImgRender[] = [
  ...Array.from({ length: 106 }, (_, i) => ({
    id: i + 1,
    img: new URL(`../assets/image${i + 1}.jpg`, import.meta.url).href,
  })),
];
