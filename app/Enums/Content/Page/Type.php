<?php

namespace App\Enums\Content\Page;

enum Type: string
{
    case DEFAULT = 'DEFAULT';
    case HOME = 'HOME';
    case BLOG_LIST = 'BLOG_LIST';
    case BLOG_POST = 'BLOG_POST';
    case BLOG_CATEGORY = 'BLOG_CATEGORY';
}
