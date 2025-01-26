import { TagsInput, Text } from "@mantine/core"
import { loadMyPost } from "../methods/methods";
import Layout from "./layout";
import "./Dashboard.css"
import { FetchPost } from "../../components/FetchPost";
import { createContext, useState } from "react";

export const TagsContext = createContext<string[] | undefined>([])
export const CommentContext = createContext<Comment[] | undefined>([])

function Dashboard() {
    const username = sessionStorage.getItem("user");
    
    const[tags, setTags] = useState<string[]>([]);

    loadMyPost();

    if(username == null) {
        return (
            <Text>Please Login First</Text>
        )
    } else {
        return (
            <Layout>
                <TagsInput
                    label="Press Enter to filter by the input tags"
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


