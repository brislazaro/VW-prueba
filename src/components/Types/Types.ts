export type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export type PostWithKey = {
  key: number;
} & Post;

export type CreatePostReq = {
  body: string;
  title: string;
  userId: number;
};
