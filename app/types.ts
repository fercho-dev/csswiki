type Filtro = "Flexbox" |
  "Grid" |
  "Gradientes" |
  "Tipografía" |
  "Animaciones" |
  "Contraste" |
  "Colores" |
  "Accesibilidad" |
  "Shadows" |
  "Snippets";

type Resource = {
  url: string,
  title?: string | null,
  description?: string | null,
  image?: string | null,
  imageWidth?: string | null,
  imageHeight?: string | null,
  imageAlt?: string | null,
  filter?: Filtro | null,
}

export type { Resource, Filtro };