import Layout from "../layout";
import { FetchMyPost } from "../../../components/ui/mypost/FetchMyPost";
import { ENDPOINT } from "../../methods/methods";
import {Text} from "@mantine/core"


export const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export function MyPostPage() {
    const user = sessionStorage.getItem("user")

    if (user == null) {
        return (
            <Text>please login first</Text>
        )
    }
    return (
        
        <Layout>
            <a href = '/dashboard' style={{marginLeft:0}}>
                See All Posts
            </a>
            <FetchMyPost/>
        </Layout>
    )
}
