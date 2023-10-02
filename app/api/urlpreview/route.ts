import { NextRequest, NextResponse } from 'next/server';
import { load } from 'cheerio';

export async function GET(request: NextRequest) {

  const extractOGProperty = (property: string, html: string) => {
    const $ = load(html);
    return $(`meta[property='${property}']`).attr('content');
  };

  const url = request.nextUrl.searchParams.get('url') || null;

  try {
    if (!url) {
        throw new Error('Missing url parameter');
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error getting html of url - ${response.statusText}`);
    }

    const html = await response.text();

    //console.log('HTML RES: ',html);

    const ogTitle = extractOGProperty("og:title", html);
    const ogDescription = extractOGProperty("og:description", html);
    const ogImage = extractOGProperty("og:image", html);
    const ogImageWidth = extractOGProperty("og:image:width", html);
    const ogImageHeight = extractOGProperty("og:image:height", html);
    const ogImageAlt = extractOGProperty("og:image:alt", html);

    const data = {
      url,
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      imageWidth: ogImageWidth,
      imageHeight: ogImageHeight,
      imageAlt: ogImageAlt,
    };

    console.log('DATA: ',data);

    return NextResponse.json(data);
  } catch (error) {
      return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}