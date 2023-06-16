<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Blog\Post;

class PostController extends Controller
{
    public function show(Post $post)
    {
        $this->seo()->setTitle($post->title);
        $this->seo()->opengraph()->setType('article');
        $this->seo()->opengraph()->setArticle([
            'published_time' => $post->created_at,
            'modified_time' => $post->updated_at,
            'author' => $post->author->name,
        ]);

        $prev = Post::prev($post)->first();
        $next = Post::next($post)->first();

        return view('blog.posts.show', ['post' => $post, 'prev' => $prev, 'next' => $next]);
    }
}
