import { Text } from "@mantine/core"
import { ENDPOINT } from "../methods/methods";
import { Post } from "../../types";
import useSWR from "swr";
import Layout from "./layout";
import "./dashboard.css"


function Dashboard() {
    const username = sessionStorage.getItem("user");
    console.log(username)

    const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());
    const {data} = useSWR<Post[]>('api/home', fetcher)

    console.log(data)

    if(username == null) {
        return (
            <Text>Please Login First</Text>
        )
    } else {
        return (
            <Layout>
                <Text>welcome</Text>
            </Layout>
            
        )
    }
}
export default Dashboard


