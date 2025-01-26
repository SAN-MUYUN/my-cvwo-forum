import { UnstyledButton } from "@mantine/core";
import { HiUser } from "react-icons/hi";
import classes from './SideNav.module.css';


export function MyPostButton() {
    return (
        <a href = "/dashboard/mypost" className={classes.mainLink} >
            <UnstyledButton key="createPostTab" className={classes.mainLink}>
                <a className={classes.link} key={'addTodo'}>
                    <HiUser className={classes.linkIcon} />
                    <span style={{padding:'10px'}}>My Post</span>
                </a>
            </UnstyledButton>
        </a>
    )
}