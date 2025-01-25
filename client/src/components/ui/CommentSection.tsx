import { Button, Text, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useState } from "react";
import { createComment } from "../../app/methods/methods";
import { useCommentContext, useSinglepostContext } from "../../app/context";
import { Comment } from "../../types";
import { CommentCard } from "./CommentCard";
import { notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';



export function CommentSection() {
    const [hideInput, setHideInput] = useState(true);
    const [commentUpdate, setCommentUpdate] = useState(0)
    var comments = useCommentContext(commentUpdate);
    comments = comments?.sort((a:Comment, b:Comment) => {
        return b.createdAt.valueOf() - a.createdAt.valueOf()
      });

    const postInfo = useSinglepostContext()
    
    const handleSubmit = async (comment:{post:Number, content:string}) => {
        await createComment(comment);
        setCommentUpdate(commentUpdate + 1)
        notifications.show({
            title:"Comment Updated",
            message: "comment is successfully updated"
        });
        setHideInput(true)
    }
    
    const form = useForm({
        initialValues:{
            post:postInfo.id,
            content: ""
        }
    })

    if (postInfo == undefined) {
        return <Text>no post</Text>
    }

    return(
        
        <>
        {/*createComment method to be implemented later */}
            <Button onClick={()=>setHideInput(!hideInput)}>Create Comment</Button>
            <br></br>
            <form hidden={hideInput} onSubmit={form.onSubmit(handleSubmit)}> 
                <Textarea 
                    hidden = {hideInput} 
                    autosize 
                    label = "Input new comment" 
                    required

                    {...form.getInputProps("content")}/>
                <br></br>
                <Button hidden = {hideInput} 
                        type="submit" 
                        onClick={()=>{setHideInput(false);
                                    
                        }}>
                    Send
                </Button>
                
            </form>
            <br></br>
            {comments && comments.map((comment: Comment) => (
                    <CommentCard key = {String(comment.id)} comment = {comment}/>
            ))}
            
        </>
    )
}