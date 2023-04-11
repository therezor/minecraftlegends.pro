<?php

namespace App\Eloquent\Policies;

use App\Eloquent\Models\Page;
use App\Models\Access\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PagePolicy
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
        return $user->can('view_any_content::page');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Eloquent\Models\Page  $page
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Page $page)
    {
        return $user->can('view_content::page');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\Access\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->can('create_content::page');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Eloquent\Models\Page  $page
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Page $page)
    {
        return $user->can('update_content::page');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Eloquent\Models\Page  $page
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Page $page)
    {
        return $user->can('delete_content::page');
    }

    /**
     * Determine whether the user can bulk delete.
     *
     * @param  \App\Models\Access\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function deleteAny(User $user)
    {
        return $user->can('delete_any_content::page');
    }

    /**
     * Determine whether the user can permanently delete.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Eloquent\Models\Page  $page
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Page $page)
    {
        return $user->can('force_delete_content::page');
    }

    /**
     * Determine whether the user can permanently bulk delete.
     *
     * @param  \App\Models\Access\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDeleteAny(User $user)
    {
        return $user->can('force_delete_any_content::page');
    }

    /**
     * Determine whether the user can restore.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Eloquent\Models\Page  $page
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Page $page)
    {
        return $user->can('restore_content::page');
    }

    /**
     * Determine whether the user can bulk restore.
     *
     * @param  \App\Models\Access\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restoreAny(User $user)
    {
        return $user->can('restore_any_content::page');
    }

    /**
     * Determine whether the user can replicate.
     *
     * @param  \App\Models\Access\User  $user
     * @param  \App\Eloquent\Models\Page  $page
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function replicate(User $user, Page $page)
    {
        return $user->can('replicate_content::page');
    }

    /**
     * Determine whether the user can reorder.
     *
     * @param  \App\Models\Access\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function reorder(User $user)
    {
        return $user->can('reorder_content::page');
    }

}
