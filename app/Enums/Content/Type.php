<?php

namespace App\Enums\Content;

enum Type: string
{
    case HEADER = 'header';
    case PARAGRAPH = 'paragraph';
    case QUOTE = 'quote';
    case WARNING = 'warning';
    case LIST = 'list';
    case EMBED = 'embed';
    case IMAGE = 'image';
}
