import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import {Fragment} from "react";

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='Browse a huge list of meetups!'/>
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    )
}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://db_user:Biosavar@cluster0.sq4au.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map((el) => ({
                    title: el.title,
                    address: el.address,
                    image: el.image,
                    id: el._id.toString()
                })
            ),
        },
        revalidate: 3600,
    }
}

export default HomePage;
