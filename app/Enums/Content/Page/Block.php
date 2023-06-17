<?php

namespace App\Enums\Content\Page;

use App\Enums\Translatable;

enum Block: string
{
    use Translatable;

    case ACTION = 'action';
    case BLOG = 'blog';
    case CONTACT = 'contact';
    case CONTENT = 'content';
    case FAQ = 'faq';
    case FEATURE = 'feature';
    case HERO = 'hero';
        case LOGO_CLOUD = 'logo-cloud';
    case PORTFOLIO = 'portfolio';
    case TESTIMONIAL = 'testimonial';
}
