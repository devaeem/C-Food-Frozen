
import { connectToDatabase} from "../../../lib/mongo";
import { Category } from "../../../lib/model/category";

export async function GET() {
 await connectToDatabase();
 try {
   const categories = await Category.find({});
   return new Response(JSON.stringify(categories), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });

 } catch (error) {
   return new Response(error, {
     status: 500,
   });
 }
}

export async function POST(req) {
 await connectToDatabase();

 try {
   const body = await req.json();
   const category = new Category(body);
   await category.save();

   return new Response(JSON.stringify(category), {
     status: 201,
     headers: {
       'Content-Type': 'application/json',
     },
   });
 } catch (error) {
   return new Response(JSON.stringify({ error: error.message }), {
     status: 500,
     headers: {
       'Content-Type': 'application/json',
     },
   });
 }
}