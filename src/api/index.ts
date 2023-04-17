type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

const baseURL = "https://jsonplaceholder.typicode.com";

export type Fetcher = ReturnType<typeof fetcher>;
export async function fetcher({
  method,
  queryURL,
  payload,
  headers,
}: {
  method: FetchMethod;
  queryURL: string;
  payload?: any;
  headers?: Record<string, string>;
}) {
  const res = await fetch(`${baseURL}/${queryURL}`, {
    method,
    body: JSON.stringify(payload),
    headers,
  });

  return res.json();
}

export async function fetchAlbums() {
  return await fetcher({ method: "GET", queryURL: "albums" });
}

export async function fetchAlbum(id: number) {
  return await fetcher({ method: "GET", queryURL: `albums/${id}` });
}

export async function fetchPhotos() {
  return await fetcher({ method: "GET", queryURL: "photos" });
}

export async function fetchPhoto(id: number) {
  return await fetcher({ method: "GET", queryURL: `photos/${id}` });
}

export async function fetchPosts() {
  return await fetcher({ method: "GET", queryURL: "posts" });
}

export async function fetchPost(id: number) {
  return await fetcher({ method: "GET", queryURL: `posts/${id}` });
}

export async function fetchUsers() {
  return await fetcher({ method: "GET", queryURL: "users" });
}

export async function fetchUser(id: number) {
  return await fetcher({ method: "GET", queryURL: `users/${id}` });
}

export async function fetchComments() {
  return await fetcher({ method: "GET", queryURL: "comments" });
}

export async function fetchComment(id: number) {
  return await fetcher({ method: "GET", queryURL: `comments/${id}` });
}
