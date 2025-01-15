import { useContext, useEffect, useState } from "react";
import { ENDPOINT } from "./methods/methods";
import { TagsContext } from "./Dashboard/Dashboard";


export function useFetchPosts() {
    const [posts, setPosts] = useState([]);
    const filteredTags = useContext(TagsContext)
    useEffect(() => {
        fetch(`${ENDPOINT}/api/dashboard/get`, {
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(filteredTags)
        })
        .then(r => r.json())
        .then(data => setPosts(data));
    }, [filteredTags]);

    return posts; // Return posts for use in components
}