import * as React from "react";
import * as ReactDOM from "react-dom";
import { unstable_createResource } from "react-cache";
import ErrorBoundary from "./ErrorBoundary";

const Suspense = React.Suspense;

const user = unstable_createResource(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "jjjj" });
        }, 1000);
    });
});

const posts = unstable_createResource(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{ id: 1, text: "1" }]);
        }, 2000);
    });
});

const resource = { user, posts };

function ProfilePage() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<h1>Loading profile...</h1>}>
                <ProfileDetails />
                <Suspense fallback={<h1>Loading posts...</h1>}>
                    <ProfileTimeline />
                </Suspense>
            </Suspense>
        </ErrorBoundary>
    );
}

function ProfileDetails() {
    // Try to read user info, although it might not have loaded yet
    const user: any = resource.user.read("user");
    return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
    // Try to read posts, although they might not have loaded yet
    const posts: any = resource.posts.read("posts");
    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.text}</li>
            ))}
        </ul>
    );
}

ReactDOM.render(<ProfilePage />, document.getElementById("root"));
