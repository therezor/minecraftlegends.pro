<?php

namespace App\Enums\Block;

enum Type: string
{
    case TEXT = 'TEXT';
    case LIST = 'LIST';
    case IMAGE = 'IMAGE';
    case VIDEO = 'VIDEO';
}
