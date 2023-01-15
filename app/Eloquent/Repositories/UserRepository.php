<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class UserRepository extends BaseRepository
{
    public function modelClass(): string
    {
        return User::class;
    }

    /**
     * @inheritdoc
     */
    public function create(array $attributes): Model
    {
        $attributes = $this->hashPassword($attributes);

        return parent::create($attributes);
    }

    /**
     * @inheritdoc
     */
    public function update(string $id, array $attributes): Model
    {
        $attributes = $this->hashPassword($attributes);

        return parent::update($id, $attributes);
    }

    /**
     * @param array<string, mixed> $attributes
     * @return array<string, mixed>
     */
    protected function hashPassword(array $attributes): array
    {
        if (!empty($attributes['password'])) {
            $attributes['password'] = Hash::make((string)$attributes['password']);

            return $attributes;
        }

        unset($attributes['password']);

        return $attributes;
    }
}
