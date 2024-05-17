import { Pagination } from "@mui/material";
import ContentCard from "../app/components/ContentCard";
import axios from "axios";
import { GetServerSideProps } from 'next';
import { ScriptProps } from "next/dist/client/script";
import { ParsedUrlQuery } from "querystring";
import styles from '../styles.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPaginationParams } from '../utils/pagination';

const BASE_URL = 'http://localhost:3000';
const PER_PAGE = 20; 

type AppProps = { 
    contentCards: ContentCard[], 
    totalPages: number, 
}

export default function App({contentCards, totalPages}: AppProps)  {
    const [page, setPage] = useState<number>(1); 
    const [cards, setCards] = useState<ContentCard[]>(contentCards)
    const router = useRouter();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/data`, {
            params: {
                page: page,
            }
        }).then((res) => {
            setCards(res.data.content);
            router.push({ query: { page: page } }, undefined, { shallow: true }); 
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, [page]);
    
    
    return <div className={styles.content_grid}>
        {cards.map(card => {
            return (<ContentCard key={card.id} 
                    imageUri={card.imageUri} 
                    textData={card.textData} 
                    comments={card.comments}
                    priority={card.metadata.priority} 
                    publishDate={card.metadata.publishDate}/> )
          })}
        <div className={styles.content_grid_pagination}>
            <Pagination  count={totalPages} page={page} variant="outlined" size="large" onChange={(_e, pageNumber) => setPage(pageNumber)} />
        </div>
    </div>
}


export const getServerSideProps: GetServerSideProps<ScriptProps, ParsedUrlQuery> = async ({ query }) => {
    const page = query.page ? parseInt(query.page as string, 10) : 1;

    const res = await axios.get(`${BASE_URL}/api/data`, {
        params: getPaginationParams(page, PER_PAGE)
    });

    const contentCards: ContentCard[] = res.data.content;
    const totalPages = res.data.totalPages; 
    
    return { 
        props: {
            contentCards,
            totalPages
        } 
    } as { props: ScriptProps }; 
};