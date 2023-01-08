<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     *
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
    public function __invoke(Request $request)
    {
        $this->setRobots('none');
        $this->seo()->setTitle(__('Please check your inbox'));

        return $request->user()->hasVerifiedEmail()
            ? redirect()->intended()
            : view('auth.verify-email');
    }
}
