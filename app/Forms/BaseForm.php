<?php

namespace App\Forms;

use Kris\LaravelFormBuilder\Form;
use App\Forms\Traits\DefaultModelRules;
use App\Forms\Traits\TranslatableModel;

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
}
