@guest
    <div class="btn-group" role="group">
        <a href="{{ route('login')}}" rel="nofollow" title="{{ __('Vote up') }}" class="btn btn-alt-primary">
            <i class="fa fa-thumbs-up"></i>
        </a>
        <a href="{{ route('login')}}" rel="nofollow" title="{{ __('Vote down') }}" class="btn btn-alt-primary">
            <i class="fa fa-thumbs-down"></i>
        </a>
    </div>
@else
    {{ Form::open(['method' => 'post', 'route' => ['posts.vote', $post->id]]) }}
        <div class="btn-group" role="group">
            <button @class([
                                'btn',
                                'btn-alt-primary' => !$vote || $vote->points < 0,
                                'disabled btn-success' => $vote && $vote->points > 0,
                            ]) name="points" type="submit" value="1" title="{{ __('Vote up') }}">
                <i class="fa fa-thumbs-up"></i>
            </button>
            <button @class([
                                'btn',
                                'btn-alt-primary' => !$vote || $vote->points > 0,
                                'disabled btn-danger' => $vote && $vote->points < 0,
                            ]) name="points" type="submit" value="-1" title="{{ __('Vote down') }}">
                <i class="fa fa-thumbs-down"></i>
            </button>
        </div>
    {{ Form::close() }}
@endguest
