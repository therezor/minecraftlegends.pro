import Sortable from 'sortablejs';

let sortable = Sortable.create(document.getElementById('page-blocks'), {
    animation: 150,
    handle: '.drag',
    onUpdate: (event) => {
        // let biolink_blocks = [];
        // $('#biolink_blocks > .biolink_block').each((i, elm) => {
        //     biolink_blocks.push({
        //         biolink_block_id: $(elm).data('biolink-block-id'),
        //         order: i
        //     });
        // });
        //
        // $.ajax({
        //     type: 'POST',
        //     url: `${url}biolink-block-ajax`,
        //     dataType: 'json',
        //     data: {
        //         request_type: 'order',
        //         biolink_blocks,
        //         global_token
        //     },
        // });
        //
        // /* Refresh iframe */
        // let biolink_preview_iframe = document.querySelector('#biolink_preview_iframe');
        // biolink_preview_iframe.setAttribute('src', biolink_preview_iframe.getAttribute('src'));
        // document.querySelector('#biolink_preview_iframe').dispatchEvent(new Event('refreshed'));
    }
});
