@guest
    <div class="row g-3">
        <div class="col-4 d-grid">
            <a class="btn text-opacity-100-hover btn-neutral text-success-hover"
               href="{{ route('login')}}" rel="nofollow" title="{{ __('Vote up') }}">
                <i class="bi bi-hand-thumbs-up"></i>
            </a>
        </div>
        <div class="col-4 d-grid">
            <div @class([
                        'btn disabled btn-secondary',
                        'text-success' => $votePoints > 0,
                        'text-danger' => $votePoints < 0,
                        ])>{{ $votePoints }}</div>
        </div>
        <div class="col-4 d-grid">
            <a class="btn text-opacity-100-hover btn-neutral text-danger-hover"
               href="{{ route('login') }}" rel="nofollow" title="{{ __('Vote down') }}">
                <i class="bi bi-hand-thumbs-down"></i>
            </a>
        </div>
    </div>
@else
    {{ Form::open(['method' => 'post', 'route' => ['posts.vote', $post->id]]) }}
    <div class="row g-3">
        <div class="col-4 d-grid">
            <button @class([
                        'btn text-opacity-100-hover text-success-hover btn-neutral',
                        'disabled btn-success' => $vote && $vote->points > 0,
                    ]) name="points" type="submit" value="1" title="{{ __('Vote up') }}">
                <i class="bi bi-hand-thumbs-up"></i>
            </button>
        </div>
        <div class="col-4 d-grid">
            <div @class([
                        'btn disabled btn-neutral',
                        'text-success' => $votePoints > 0,
                        'text-danger' => $votePoints < 0,
                        ])>{{ $votePoints }}</div>
        </div>
        <div class="col-4 d-grid">
            <button @class([
                        'btn text-opacity-100-hover text-danger-hover btn-neutral',
                        'disabled btn-danger' => $vote && $vote->points < 0,
                    ]) name="points" type="submit" value="-1" title="{{ __('Vote down') }}">
                <i class="bi bi-hand-thumbs-down"></i>
            </button>
        </div>
    </div>
    {{ Form::close() }}
@endguest
