import { Button, NavLink, Text } from "@mantine/core";
import Layout from "../layout";
import { FetchMyPost } from "../../../components/ui/FetchMyPost";
import { createContext, useState } from "react";
import { Post } from "../../../types";
import { ENDPOINT } from "../../methods/methods";


export const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export function MyPostPage() {
    const [posts, setPosts] = useState<Post[]>([])
    
    return (
        <Layout>
            <a href = '/dashboard' style={{marginLeft:0}}>
                Back
            </a>
            <FetchMyPost/>
        </Layout>
    )
}
