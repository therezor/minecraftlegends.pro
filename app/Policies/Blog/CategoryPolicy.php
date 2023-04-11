<?php

namespace App\Policies\Blog;

use App\Models\Access\User;
use App\Models\Blog\Category;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\Access\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return $user->can('view_any_blog::category');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Models\Blog\Category  $category
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Category $category)
    {
        return $user->can('view_blog::category');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\Access\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->can('create_blog::category');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Models\Blog\Category  $category
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Category $category)
    {
        return $user->can('update_blog::category');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Models\Blog\Category  $category
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Category $category)
    {
        return $user->can('delete_blog::category');
    }

    /**
     * Determine whether the user can bulk delete.
     *
     * @param  \App\Models\Access\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function deleteAny(User $user)
    {
        return $user->can('delete_any_blog::category');
    }

    /**
     * Determine whether the user can permanently delete.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Models\Blog\Category  $category
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Category $category)
    {
        return $user->can('force_delete_blog::category');
    }

    /**
     * Determine whether the user can permanently bulk delete.
     *
     * @param  \App\Models\Access\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDeleteAny(User $user)
    {
        return $user->can('force_delete_any_blog::category');
    }

    /**
     * Determine whether the user can restore.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Models\Blog\Category  $category
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Category $category)
    {
        return $user->can('restore_blog::category');
    }

    /**
     * Determine whether the user can bulk restore.
     *
     * @param  \App\Models\Access\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restoreAny(User $user)
    {
        return $user->can('restore_any_blog::category');
    }

    /**
     * Determine whether the user can replicate.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Models\Blog\Category  $category
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function replicate(User $user, Category $category)
    {
        return $user->can('replicate_blog::category');
    }

    /**
     * Determine whether the user can reorder.
     *
     * @param  \App\Models\Access\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function reorder(User $user)
    {
        return $user->can('reorder_blog::category');
    }

}
