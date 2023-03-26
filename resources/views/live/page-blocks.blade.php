@foreach($blocks as $block)
    @include('panel.pages.blocks.header')
@endforeach

<button
    yoyo:post="addBlock"
    yoyo:on="click"
    class="btn btn-primary display-block"
>
    @csrf
   Add block
</button>
