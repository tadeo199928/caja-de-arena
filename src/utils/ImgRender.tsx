type GodImageModule = { default: string };

const modules = import.meta.glob("../assets/*.jpg", {
  eager: true,
}) as Record<string, GodImageModule>;

export interface ImgRender {
  id: number;
  img: string;
}

export const imgOfGods: ImgRender[] = Object.entries(modules)
  .map(([path, mod]) => {
    const match = path.match(/image(\d+)\.jpg$/);
    const id = match ? Number(match[1]) : 0;
    return { id, img: mod.default };
  })
  .filter((x) => x.id > 0)
  .sort((a, b) => a.id - b.id);