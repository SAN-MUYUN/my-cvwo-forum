import {Button, Modal, TagsInput, Textarea, TextInput, UnstyledButton} from '@mantine/core'
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { HiOutlinePencil } from 'react-icons/hi';
import classes from '../SideNav/SideNav.module.css';
import { createPost } from '../../app/methods/methods';


function CreatePostTab() {

    const [openModal, setOpenModal] = useState(false);

    const form = useForm({
        initialValues:{
            username:sessionStorage.getItem("user"),
            title: "",
            body:"",
            tags:[],
            createdAt: Date.now()
            
        }
    })

    return (
        <>
            {/* modal for the create post form itself */}

            <Modal opened = {openModal} size = "50%" onClose={() => {setOpenModal(false)}} title = "Create Post" centered>
                    <form onSubmit={form.onSubmit(createPost)}>
                        <TextInput required mb={12} label="title" placeholder='title' {...form.getInputProps("title")}/>
                        <Textarea 
                            required 
                            mb={12} 
                            label="body"
                            autosize = {true}
                             
                            placeholder='content...' {...form.getInputProps("body")}/>
                        <TagsInput
                            label="Press Enter to submit a tag"
                            placeholder="Enter tag"
                            defaultValue={['React']}
                            allowDuplicates = {false}
                            clearable
                            limit={5}
                            {...form.getInputProps("tags")}
                        />
                        
                        <Button 
                            type = 'submit'
                            style= {{ marginTop: '20px', padding: '10px 20px'}} 
                            onClick={() => {setOpenModal(false)}
                            }>Post</Button>
                    </form>
            </Modal>

            {/* the createPost tab that on the sidenav */}

            <div className={classes.section} onClick={() => {
                                setOpenModal(true)
                            }}>
                <div className={classes.mainLink}>
                    <UnstyledButton key="createPostTab" className={classes.mainLink}>
                        <a className={classes.link} key={'addTodo'}>
                            <HiOutlinePencil className={classes.linkIcon} />
                            <span style={{padding:'10px'}}>Create Post</span>
                        </a>
                    </UnstyledButton>
                </div>
            </div>
    </>
    )
}

export default CreatePostTab