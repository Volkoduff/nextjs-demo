// /api/new-meetup
import { MongoClient } from 'mongodb';

export async function handler(req, res) {
    if (req.method === 'POST') {
         const data = req.body;
         const client = await MongoClient.connect('mongodb+srv://db_user:Biosavar@cluster0.sq4au.mongodb.net/meetups?retryWrites=true&w=majority');

         const db = client.db();
         const meetupsCollection = db.collection('meetups');

         const result = await meetupsCollection.insertOne(data);
         client.close();

         res.status(201).json({message: 'MmeetupInserted@'});
         console.log(result);

    }
}

export default handler;
