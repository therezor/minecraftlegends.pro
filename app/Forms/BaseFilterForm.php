<?php

namespace App\Forms;

use App\Eloquent\Repositories\Criteria\FilterCriteria;
use App\Forms\Traits\TranslatableModel;
use Kris\LaravelFormBuilder\Form;

class BaseFilterForm extends Form
{
    use TranslatableModel;

    protected $errorBag = 'filter_form';

    public function getFilterCriteria(): FilterCriteria
    {
        return new FilterCriteria($this->getFieldValues(false));
    }

    public function setFormOptions(array $formOptions, $unsetModel = false)
    {
        $this->setModelTranslations($formOptions['model'] ?? null);

        unset($formOptions['model']);

        return parent::setFormOptions($formOptions);
    }

    protected function setupFieldOptions($name, &$options)
    {
        if (empty($options['attr']['class'])) {
            $options['attr']['class'] = config('laravel-form-builder.defaults.field_class') . ' form-control-sm';
        }

        if ($this->request->has($name)) {
            $options['default_value'] = $this->request->get($name);
        }

        parent::setupFieldOptions($name, $options);
    }
}
