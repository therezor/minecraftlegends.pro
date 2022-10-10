<?php

namespace App\Fields;

use App\Eloquent\Models\Contracts\HasTranslation;
use App\Fields\Contracts\Field;
use App\Fields\Traits\Callbackable;
use App\Fields\Traits\HasMeta;
use App\Fields\Traits\Sortable;
use App\Fields\Traits\TranslateValue;
use Illuminate\Support\HtmlString;

class BaseField implements Field
{
    use Callbackable, Sortable, HasMeta, TranslateValue;

    protected $name;

    protected $label;

    protected $valueCallback;

    protected $labelCallback;

    protected $template;

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public static function make(... $args)
    {
        return new static(...$args);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function render($entity = null)
    {
        if ($this->template) {
            return $this->renderTemplate($entity);
        }

        return $this->resolveValue($entity);
    }

    public function label($label): self
    {
        $this->label = $label;

        return $this;
    }

    public function template(?string $template): self
    {
        $this->template = $template;

        return $this;
    }

    public function resolveValue($entity = null)
    {
        $value = $this->resolveAttribute($entity, $this->name);

        $value = $this->transformValue($value, $entity);

        return $value;
    }

    public function transformValue($value, $entity = null)
    {
        if (is_callable($this->valueCallback)) {
            $value = call_user_func(
                $this->valueCallback, $value, $entity, $this
            );
        }

        return $value;
    }

    public function resolveLabel($entity = null)
    {
        $label = $this->label ?: $this->name;

        if (null === $this->label && $entity instanceof HasTranslation) {
            $label = trans($entity->getTranslationPrefix() . '.' . $this->name);
        }

        if (is_callable($this->labelCallback)) {
            $label = call_user_func(
                $this->labelCallback, $label, $entity, $this
            );
        }

        return $label;
    }

    protected function resolveAttribute($resource, $attribute)
    {
        if (!$attribute || null === $resource) {
            return null;
        }

        return data_get($resource, $attribute);
    }

    protected function renderTemplate($entity)
    {
        $value = $this->resolveValue($entity);
        $label = $this->resolveLabel($entity);

        if (null === $value) {
            return '';
        }

        $rendered = view($this->template)->with([
            'field'  => $this,
            'entity' => $entity,
            'label'  => $label,
            'value'  => $value,
        ])->render();

        return new HtmlString($rendered);
    }
}
