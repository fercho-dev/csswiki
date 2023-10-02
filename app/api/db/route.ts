import clientPromise from "../../lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const url_solicitud = request.nextUrl.searchParams.get('url')
  const filtro = request.nextUrl.searchParams.get('filtro')

   try {
       const client = await clientPromise;
       const db = client.db(process.env.MONGODB_DB_NAME);

      // get collection
      //  const urls = await db
      //      .collection("urls")
      //      .find({})
      //      .toArray();

      // return NextResponse.json(urls);

      // insert to collection
      const doc = { url: url_solicitud, filtro: filtro };
      const myColl = db.collection(process.env.MONGODB_COLLECTION_NAME as string);
      const result = await myColl.insertOne(doc);

      return NextResponse.json(result);

   } catch (error) {
       console.error(error);
       return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
   }
};