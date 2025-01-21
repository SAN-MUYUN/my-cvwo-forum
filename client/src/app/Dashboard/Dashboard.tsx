import { TagsInput, Text } from "@mantine/core"
import { loadMyPost } from "../methods/methods";
import Layout from "./layout";
import "./dashboard.css"
import { FetchPost } from "../../components/FetchPost";
import { createContext, useState } from "react";

export const TagsContext = createContext<string[] | undefined>([])
export const CommentContext = createContext<Comment[] | undefined>([])

function Dashboard() {
    const username = sessionStorage.getItem("user");
    console.log(username)
    
    const[tags, setTags] = useState<string[]>([]);
    // const[posts, setPosts] = useState<Post[]>([]);
    loadMyPost();

    if(username == null) {
        return (
            <Text>Please Login First</Text>
        )
    } else {
        return (
            <Layout>
                <TagsInput
                    label="Press Enter to submit a tag"
                    placeholder="Enter tag to filter posts"
                    allowDuplicates = {false}
                    clearable
                    onChange={(tags) => setTags(tags)}
                    className="dashboard-content"
                />
                <br></br>
                  
                <TagsContext.Provider value={tags}>
                        <FetchPost/>
                </TagsContext.Provider>
            </Layout>
            
        )
    }
}
export default Dashboard


