<?php

namespace App\Eloquent\Casts\Dto;

use EditorJS\BlockHandler;
use EditorJS\EditorJSException;
use Illuminate\Contracts\Support\Jsonable;
use Stringable;

class Content implements Jsonable, Stringable
{
    protected array $data;
    protected array $blocks = [];
    protected BlockHandler $handler;

    public function __construct(string $json)
    {
        $this->handler = new BlockHandler(json_encode(config('content')));

        /**
         * Check if json string is empty
         */
        if (empty($json)) {
            throw new EditorJSException('JSON is empty');
        }

        /**
         * Check input data
         */
        $data = json_decode($json, true);

        /**
         * Handle decoding JSON error
         */
        if (json_last_error()) {
            throw new EditorJSException('Wrong JSON format: ' . json_last_error_msg());
        }

        /**
         * Check if data is null
         */
        if ($data === null) {
            throw new EditorJSException('Input is null');
        }

        /**
         * Count elements in data array
         */
        if (count($data) === 0) {
            throw new EditorJSException('Input array is empty');
        }

        /**
         * Check if blocks param is missing in data
         */
        if (!isset($data['blocks'])) {
            throw new EditorJSException('Field `blocks` is missing');
        }

        if (!is_array($data['blocks'])) {
            throw new EditorJSException('Blocks is not an array');
        }

        $this->data = $data;
    }

    public function data(): array
    {
        return $this->data;
    }

    public function blocks(): array
    {
        return $this->data['blocks'];
    }

    public function sanitize()
    {
        foreach ($this->data['blocks'] as $key => $block) {
            $this->data['blocks'][$key] = $this->handler->sanitizeBlock($block['type'], $block['data']);
        }

        return $this;
    }

    public function validate(): bool
    {
        foreach ($this->data['blocks'] as $block) {
            if (!$this->handler->validateBlock($block['type'], $block['data'])) {
                return false;
            }
        }

        return true;
    }

    public function toJson($options = 0): string
    {
        return json_encode($this->data, $options);
    }

    public function __toString(): string
    {
        return $this->toJson();
    }
}
