export type Post = {
    id: Number
    username: string
    title: string
    body: string
    tags: string[]
    createdAt: Number
}

export type Comment = {
    id: Number
    post: Number
    user: string
    body: string
    createdAt: Number
}
