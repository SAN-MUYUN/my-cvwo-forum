import { UnstyledButton } from "@mantine/core";
import classes from './SideNav.module.css';
import { HiOutlineLogout } from "react-icons/hi";

export function LogoutButton() {
    return (
        <a href = "/" className={classes.mainLink} onClick={() => localStorage.removeItem("user")}>
            <UnstyledButton key="Logout" className={classes.mainLink}>
                <a className={classes.link} key={'addTodo'} color="red">
                    <HiOutlineLogout className={classes.logoutText} />
                    <span className = {classes.logoutText} style={{padding:'10px'}} >Logout</span>
                </a>
            </UnstyledButton>
        </a>
    )
}