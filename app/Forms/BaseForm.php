<?php

namespace App\Forms;

use App\Forms\Traits\DefaultModelRules;
use App\Forms\Traits\TranslatableModel;
use Kris\LaravelFormBuilder\Fields\FormField;
use Kris\LaravelFormBuilder\Form;

abstract class BaseForm extends Form
{
    use TranslatableModel;
    use DefaultModelRules;

    protected $formOptions = [
        'autocomplete' => 'off',
    ];

    protected $errorBag = 'form';

    public function setFormOptions(array $formOptions)
    {
        $this->setModelTranslations($formOptions['model'] ?? null);

        return parent::setFormOptions($formOptions);
    }

    protected function setupFieldOptions($name, &$options)
    {
        if (empty($options['rules'])) {
            $options['rules'] = $this->getModelRules($name, $this->getModel());
        }

        parent::setupFieldOptions($name, $options);
    }

    protected function addField(FormField $field, $modify = false)
    {
        if ($field->getType() === 'image-upload') {
            $this->formOptions['files'] = true;
        }

        return parent::addField($field, $modify);
    }
}
