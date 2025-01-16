import Layout from "../layout";
import { FetchMyPost } from "../../../components/ui/FetchMyPost";
import { ENDPOINT } from "../../methods/methods";


export const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export function MyPostPage() {
    
    return (
        <Layout>
            <a href = '/dashboard' style={{marginLeft:0}}>
                Back
            </a>
            <FetchMyPost/>
        </Layout>
    )
}
