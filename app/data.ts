import { Resource, Filtro } from './types';
import { load } from 'cheerio';

const defaultImage = 'https://images.unsplash.com/photo-1621839673705-6617adf9e890'

const resources: Resource[] = [
  {
    url: 'https://uiverse.io/',
    filter: 'Snippets',
  },
  {
    url: 'https://neumorphism.io/',
    filter: 'Shadows',
  },
  {
    url: 'https://www.joshwcomeau.com/shadow-palette/',
    filter: 'Shadows',
  },
  {
    url: 'https://colorable.jxnblk.com/',
    filter: 'Contraste',
    image: 'https://i.imgur.com/LxdQ1N8.png',
  },
  {
    url: 'https://webaim.org/resources/contrastchecker/',
    filter: 'Contraste',
    image: 'https://i.imgur.com/Kdi29GC.png',
  },
  {
    url: 'https://mycolor.space/',
    filter: 'Colores',
    image: 'https://i.imgur.com/89RQdj2.png',
  },
  {
    url: 'https://colorhunt.co/',
    filter: 'Colores',
  },
  {
    url: 'https://animate.style/',
    filter: 'Animaciones',
  },
  {
    url: 'https://animista.net/',
    filter: 'Animaciones',
  },
  {
    url: 'https://typescale.com/',
    filter: 'Tipografía',
    image: 'https://i.imgur.com/ZNahaq1.png',
  },
  {
    url: 'https://www.gradientmagic.com/',
    filter: 'Gradientes',
  },
  {
    url: 'https://cssgradient.io/',
    filter: 'Gradientes',
  },
  {
    url: 'https://gridbyexample.com/examples/',
    filter: 'Grid',
    image: 'https://i.imgur.com/WBAQZgn.png',
  },
  {
    url: 'http://www.flexboxdefense.com/',
    filter: 'Flexbox',
  },
  {
    url: 'https://bennettfeely.com/flexplorer/',
    filter: 'Flexbox',
    image: 'https://i.imgur.com/TAxaeG1.png',
  },
  {
    url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
    filter: 'Flexbox',
  },
  {
    url: 'https://flexboxfroggy.com/#es',
    filter: 'Flexbox',
  },
  {
    url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
    filter: 'Grid',
  },
  {
    url: 'https://cssgridgarden.com/#es',
    filter: 'Grid',
  },
]

const filters: Filtro[] = resources.map(resource => resource?.filter).filter((value, index, self) => self.indexOf(value) === index) as Filtro[];

const extractMetaContentFromHtml = (property: string, htmlContent: string) => {
  const $ = load(htmlContent);
  return $(`meta[property='${property}']`).attr('content');
};

async function fetchData() {
  const galleryItems: Resource[] = await Promise.all(
    resources.map(async (resource: Resource) => {
      const response = await fetch(resource.url, { mode: 'no-cors' });

      if (!response.ok) {
        throw new Error(`Error getting html of url: ${resource.url} - ${response.statusText}`);
      }

      const html = await response.text();

      const ogTitle = extractMetaContentFromHtml("og:title", html);
      const ogDescription = extractMetaContentFromHtml("og:description", html);
      const ogImage = extractMetaContentFromHtml("og:image", html);
      const ogImageWidth = extractMetaContentFromHtml("og:image:width", html);
      const ogImageHeight = extractMetaContentFromHtml("og:image:height", html);
      const ogImageAlt = extractMetaContentFromHtml("og:image:alt", html);

      const data = {
        url: resource.url,
        filter: resource.filter,
        title: resource.title || ogTitle || resource.url,
        description: resource.description || ogDescription,
        image: resource.image || ogImage || defaultImage,
        imageWidth: resource.imageWidth || ogImageWidth,
        imageHeight: resource.imageHeight || ogImageHeight,
        imageAlt: resource.imageAlt || ogImageAlt || ogTitle || resource.url,
      };

      return data;
    })
  );

  return galleryItems;
}

function shuffle(arr: Resource[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];  // intercambio usando destructuring
  }
}

shuffle(resources);

export { filters, resources, fetchData };